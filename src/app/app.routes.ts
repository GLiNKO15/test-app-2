import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
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
            ).then((c) => c.WeatherHourlyTable)
      }
    ]
  }
];




