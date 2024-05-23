import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./core/weather/weather.component').then((comp) => comp.Weather),
    children: [
      {
        path: 'daily',
        loadComponent: () =>
          import(
            './core/weather/libs/tables/daily/weather-daily.component'
          ).then((c) => c.WeatherDailyTable),
      },
      {
        path: 'hourly',
        loadComponent: () =>
          import(
            './core/weather/libs/tables/hourly/weather-hourly.component'
          ).then((c) => c.WeatherHoulyTable),
      },
    ],
  },
];
