import { Injectable } from '@angular/core';
import { AllWeatherData } from '../interfaces/all-weather.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherStateService {
  public readonly weatherHourly$ = new BehaviorSubject<AllWeatherData['hourly'][]>([]);
  public readonly weatherDaily$ = new BehaviorSubject<AllWeatherData['daily'][]>([]);
  public readonly weatherNameLocation$ = new BehaviorSubject<string[]>([]);
}