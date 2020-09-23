import { Forecast } from 'src/app/models/forecast.model';

export interface Location {
  city: string;
  country: string;
  currentForecast: Forecast;
  weekForecast: Record<number, Forecast[]>;
}
