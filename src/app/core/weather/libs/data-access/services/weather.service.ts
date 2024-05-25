import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DTOWeatherData } from '../interfaces/DTO-weather.interface';
import { LatLonEntity, LatLonInterface } from '../interfaces/weather.types';
import {
  BehaviorSubject,
  Observable,
  catchError,
  first,
  map,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  public readonly weatherHourly$ = new BehaviorSubject<DTOWeatherData['hourly'][]>([]);
  public readonly weatherDaily$ = new BehaviorSubject<DTOWeatherData['daily'][]>([]);
  public readonly weatherNameLocation$ = new BehaviorSubject<string[]>([]);

  public getWeather(location: LatLonEntity) {
    const weatherApi$ = this.http.get<DTOWeatherData>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=010721642521f31b0fbc8c3831d45951`
    );

    weatherApi$
      .pipe(
        first(),
        map((weather) => weather.daily),
        map((s) => s.slice(0, -1)),
        tap((res) => this.pushArrBehaviorSubject(this.weatherDaily$, res))
      )
      .subscribe();

    weatherApi$
      .pipe(
        first(),
        map((weather) => weather.hourly),
        map((hourly) =>
          hourly.filter((elem, index) => index % 3 == 0 && index != 0)
        ),
        map((hourly) => hourly.slice(0, 8)),
        tap((res) => this.pushArrBehaviorSubject(this.weatherHourly$, res))
      )
      .subscribe();
  }

  public getLatLon(
    name: string
  ): Observable<string | LatLonEntity> {
    return this.http
      .get<LatLonInterface[]>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=010721642521f31b0fbc8c3831d45951`
      )
      .pipe(
        first(),
        map((arrayLatLon) => {
          if (arrayLatLon.length == 1) {
            this.weatherNameLocation$.next([
              ...this.weatherNameLocation$.value,
              arrayLatLon[0].name,
            ]);
            return {
              lat: arrayLatLon[0].lat,
              lon: arrayLatLon[0].lon,
            };
          } else {
            throw of('Данные не найдены!');
          }
        }),
        catchError((err) => of(err))
      );
  }

  private pushArrBehaviorSubject<T>(stream: BehaviorSubject<T[]>, value: T) {
    return stream.next([...stream.value, value]);
  }
}
