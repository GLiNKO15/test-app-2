import { Component } from '@angular/core';
import { WeatherSearch } from './libs/feature-search/search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'weather',
  standalone: true,
  templateUrl: './weather.component.html',
  imports: [WeatherSearch, RouterModule],
})
export class Weather {}
