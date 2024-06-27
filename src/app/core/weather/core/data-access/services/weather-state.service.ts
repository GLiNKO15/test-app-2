import { Injectable } from '@angular/core';
import { DailyWeatherInterface, HourlyWeatherInterface } from '../interfaces/weather.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherStateService {
  public readonly weatherHourly$ =
    new BehaviorSubject<HourlyWeatherInterface['hourly'][]>([]);
  public readonly weatherDaily$ =
    new BehaviorSubject<DailyWeatherInterface['daily'][]>([]);
  public readonly weatherNameLocation$ = new BehaviorSubject<string[]>([]);
}