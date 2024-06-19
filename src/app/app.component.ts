import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherSearch } from './core/weather/feature-search/src/lib/search/search.component';


@Component({
  standalone: true,
  imports: [WeatherSearch, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
