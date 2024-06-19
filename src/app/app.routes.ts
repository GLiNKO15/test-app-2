import { Route } from '@angular/router';
// import { WeatherComponent } from './core/weather/src/lib/weather/weather.component';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    // loadComponent: () =>
    //   import('./app.component').then((comp) => comp.AppComponent),
    children: [
      {
        path: 'daily',
        loadComponent: () =>
          import(
            './core/weather/feature-tables/src/lib/daily/weather-daily.component'
            ).then((c) => c.WeatherDailyTable)
      },
      {
        path: 'hourly',
        loadComponent: () =>
          import(
            './core/weather/feature-tables/src/lib/hourly/weather-hourly.component'
            ).then((c) => c.WeatherHoulyTable)
      }
    ]
  }
];




