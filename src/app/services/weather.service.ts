import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { groupBy, map as mapR } from 'ramda';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast } from '../models/forecast.model';
import { Location } from '../models/location.model';

interface RawWeekForecastData {
  list: {
    dt: number;
    main: Record<'temp' | 'temp_min' | 'temp_max', number>;
    weather: Record<'description' | 'icon', string>[];
  }[];
}

interface RawCurrentForcastData {
  name: string;
  dt: number;
  sys: Record<'country', string>;
  main: Record<'temp' | 'temp_min' | 'temp_max', number>;
  weather: Record<'description' | 'icon', string>[];
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl = 'http://api.openweathermap.org/data/2.5';
  apiID = '3f1da10438d11f7db6066daa4d249dac';
  units = 'metric';

  constructor(private http: HttpClient) {}

  getCurrentForecast(city: string): Observable<RawCurrentForcastData>{
    const params = { appid: this.apiID, units: this.units, q: city };

    return this.http.get<RawCurrentForcastData>(`${this.baseUrl}/weather`, { params });
  }

  getWeekForecast(city: string): Observable<RawWeekForecastData> {
    const params = { appid: this.apiID, units: this.units, q: city };

    return this.http.get<RawWeekForecastData>(`${this.baseUrl}/forecast`, { params });
  }

  mapForecast(forecast: RawCurrentForcastData | RawWeekForecastData['list'][number]): Forecast {
    const date = new Date(forecast.dt * 1000);

    return {
      date,
      temp: forecast.main.temp,
      tempMin: forecast.main.temp_min,
      tempMax: forecast.main.temp_max,
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
    };
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getLocation(city: string): Observable<Location> {
    return zip(
      this.getCurrentForecast(city),
      this.getWeekForecast(city),
    ).pipe(map(([current, week]) => {

      const weekGroupedByDate = groupBy((el) => {
        const date = new Date(el.dt * 1000);

        return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      }, week.list);

      return ({
        city: current.name,
        country: current.sys.country,
        currentForecast: this.mapForecast(current),
        weekForecast: mapR(val => val.map(el => this.mapForecast(el)), weekGroupedByDate),
      });
    }));
  }
}
