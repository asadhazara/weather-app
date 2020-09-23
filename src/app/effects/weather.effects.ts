import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, exhaustMap, map, startWith, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { WeatherService } from 'src/app/services/weather.service';
import * as WeatherActions from '../actions/weather.actions';
import { AppState } from '../app.state';
import { AppError } from '../models/app-error.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions, private weatherService: WeatherService) {}

  @Effect() fetchCityForecast = this.actions$.pipe(
    ofType(WeatherActions.START_FETCHING),
    exhaustMap((action: ReturnType<typeof WeatherActions.startFetching>) =>
      this.weatherService.getLocation(action.city).pipe(
        map(data => WeatherActions.AddLocation({ location: data })),
        startWith(WeatherActions.setLoading()),
        catchError((err: HttpErrorResponse) => {
          let error: AppError;

          if (err.status === 404) {
            error = { message: 'Location not found.' };
          } else {
            error = { message: 'Something went wrong. Try again laters.' };
          }

          return of(WeatherActions.setError({ error }));
        })
      )
    )
  );
}
