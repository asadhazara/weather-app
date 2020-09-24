import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/models/forecast.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent {
  @Input() timeslot!: Forecast;

  constructor(private weatherService: WeatherService) { }

  getWeatherIconUrl(icon: string): string {
    return this.weatherService.getWeatherIconUrl(icon);
  }

  getHour(date: Date): string {
    return date.getHours().toString().padStart(2, '0');
  }

  getRoundTemp(temp: number): number {
    return Math.round(temp);
  }
}
