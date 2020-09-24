import { Component, Input } from '@angular/core';
import { Forecast } from 'src/app/models/forecast.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @Input() timeslots!: Forecast[];
  @Input() isWarmer!: boolean;
  @Input() isCurrent!: boolean;

  constructor(private weatherService: WeatherService) { }

  getWeatherIconUrl = this.weatherService.getWeatherIconUrl;

  getFormatedDate(date: Date): string {
    const weekday = date.toLocaleString('default', { weekday: 'long' });
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${weekday} — ${day} ${month} ${year}`.toUpperCase();
  }
}
