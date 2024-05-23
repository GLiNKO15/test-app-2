import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DTOWeatherData, LatLonEntity, LatLonInterface } from './weather.types';
import { BehaviorSubject, Observable, catchError, first, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  weatherHourly$ = new BehaviorSubject<DTOWeatherData['hourly'][]>([]);
  weatherDaily$ = new BehaviorSubject<DTOWeatherData['daily'][]>([]);
  weatherNameLocation$ = new BehaviorSubject<string[]>([]);

  getWeather(location: LatLonEntity) {
    const weatherApi$ = this.http.get<DTOWeatherData>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=010721642521f31b0fbc8c3831d45951`
    );

    weatherApi$
      .pipe(
        first(),
        map((weather) => weather.daily),
        map((s) => {
          s.pop();
          return s;
        })
      )
      .subscribe((res) =>
        this.weatherDaily$.next([...this.weatherDaily$.value, res])
      );

    weatherApi$
      .pipe(
        first(),
        map((weather) => weather.hourly),
        map((hourly) =>
          hourly.filter((elem, index) => index % 3 == 0 && index != 0)
        ),
        map((hourly) => hourly.slice(0, 8))
      )
      .subscribe((res) =>
        this.weatherHourly$.next([...this.weatherHourly$.value, res])
      );
  }

  getLatLon(name: string): Observable<string | { lat: number; lon: number }> {
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
        catchError((err: string) => {
          return of(err);
        })
      );
  }
}
