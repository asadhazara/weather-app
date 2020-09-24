import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { keys, map as mapR, flatten } from 'ramda';
import { map, withLatestFrom } from 'rxjs/operators';
import { RemoveLocation, toggleDateOrder } from 'src/app/actions/weather.actions';
import { AppState } from 'src/app/app.state';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  weather$ = this.store.select('weather');

  locations$ = this.weather$.pipe(map(weather => weather.locations));

  uniqueDates$ = this.weather$.pipe(map(weather =>
    flatten(weather.locations.map(loc => keys(loc.weekForecast)))
    .filter((item, index, arr) => arr.findIndex((i) => i === item) === index)
    .sort((a, b) => weather.dateOrder === 'ASC' ? a - b : b - a),
  ));

  warmerLocationIndexCurrent$ = this.weather$.pipe(map(weather => weather.locations.findIndex(
    loc => Math.max(...weather.locations.map(l => l.currentForecast.temp)) === loc.currentForecast.temp
  )));

  averageTemps$ = this.locations$.pipe(
    map(locations => locations.map(
      location =>  Object.assign({}, ...keys(location.weekForecast).map(date => ({
        [date]: location.weekForecast[date].reduce((a, b) => a + b.temp, 0) / location.weekForecast[date].length
      }))) as Record<number, number>
    ))
  );

  warmerLocationIndexWeek$ = this.uniqueDates$.pipe(
    withLatestFrom(this.averageTemps$),
    map(([dates, averageTemps]) =>  Object.assign({}, ...dates.map(date => ({
      [date]: averageTemps.findIndex(temp => Math.max(...averageTemps.map(t => t[date])) === temp[date])
    }))) as Record<number, number>)
  );

  constructor(private store: Store<AppState>, private weatherService: WeatherService) {}

  getWeatherIconUrl = this.weatherService.getWeatherIconUrl;

  removeLocation(index: number): void {
    this.store.dispatch(RemoveLocation({ index }));
  }

  toggleDateOrder(): void {
    this.store.dispatch(toggleDateOrder());
  }
}
