import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DailyWeatherInterface, HourlyWeatherInterface } from '../interfaces/weather.interfaces';
import { LatLonEntity, LatLonInterface } from '../interfaces/weather-lat-lon.interfaces';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { WeatherStateService } from './weather-state.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly http = inject(HttpClient);
  private readonly WeatherStateService = inject(WeatherStateService);

  public getWeather(location: LatLonEntity) {
    const weatherDaily$ = this.http.get<DailyWeatherInterface>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=010721642521f31b0fbc8c3831d45951`
    );

    const weatherHourly$ = this.http.get<HourlyWeatherInterface>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=010721642521f31b0fbc8c3831d45951`
    );

    weatherDaily$
      .pipe(
        first(),
        map((weather) => weather.daily),
        map((s) => s.slice(0, -1)),
        tap((res) => this.pushArrBehaviorSubject(this.WeatherStateService.weatherDaily$, res))
      )
      .subscribe();

    weatherHourly$
      .pipe(
        first(),
        map((weather) => weather.hourly),
        map((hourly) =>
          hourly.filter((elem, index) => index % 3 == 0 && index != 0)
        ),
        map((hourly) => hourly.slice(0, 8)),
        tap((res) => this.pushArrBehaviorSubject(this.WeatherStateService.weatherHourly$, res))
      )
      .subscribe();
  }

  public getLatLon(name: string): Observable<LatLonEntity | string> {
    return this.http
      .get<LatLonInterface[]>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=010721642521f31b0fbc8c3831d45951`
      )
      .pipe(
        first(),
        map((arrayLatLon) => {
          if (arrayLatLon.length == 1) {
            this.WeatherStateService.weatherNameLocation$.next([
              ...this.WeatherStateService.weatherNameLocation$.value,
              arrayLatLon[0].name
            ]);
            return {
              lat: arrayLatLon[0].lat,
              lon: arrayLatLon[0].lon
            };
          } else {
            return 'Данные не найдены!';
          }
        })
      );
  }

  private pushArrBehaviorSubject<T>(stream: BehaviorSubject<T[]>, value: T) {
    return stream.next([...stream.value, value]);
  }
}
