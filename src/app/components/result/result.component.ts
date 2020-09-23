import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { keys } from 'ramda';
import { Observable } from 'rxjs';
import { RemoveLocation } from 'src/app/actions/weather.actions';
import { AppState } from 'src/app/app.state';
import { Location } from 'src/app/models/location.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  weather$ = this.store.select('weather');
  dateOrder: 'DESC' | 'ASC' = 'ASC';

  constructor(private store: Store<AppState>, private weatherService: WeatherService) {}

  getWeatherIconUrl(icon: string): string {
    return this.weatherService.getWeatherIconUrl(icon);
  }

  removeLocation(index: number): void {
    this.store.dispatch(RemoveLocation({ index }));
  }

  onToggleDateOrder(): void {
    this.dateOrder = this.dateOrder === 'ASC' ? 'DESC' : 'ASC';
  }

  getOrderedWeekDate(forecast: Location['weekForecast']): number[] {
    return keys(forecast).sort((a, b) => this.dateOrder === 'ASC' ? a - b : b - a);
  }
}
