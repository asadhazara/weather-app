import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { AddLocation, setSearching, startFetching } from 'src/app/actions/weather.actions';
import { AppState } from 'src/app/app.state';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  weather$ = this.store.select('weather');

  isSearching$ = this.weather$.pipe(map(weather => weather.isSearching));

  maxLocationsReached$ = this.weather$.pipe(map(weather => weather.locations.length >= 2));

  constructor(private store: Store<AppState>) {}

  onSetSearching(): void {
    this.store.dispatch(setSearching());
  }

  onSearch(city: string): void {
    if (city !== '') {
      this.store.dispatch(startFetching({ city }));
    }
  }

  ngOnInit(): void {
  }
}
