import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Observable, first, map } from 'rxjs';
import { LatLonEntity } from '../services/weather.types';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weather-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
})
export class WeatherSearch {
  searchInput = new FormControl('', Validators.required);
  errorMessage$: Observable<string> | null = null;
  router = inject(Router);

  apiWeather = inject(WeatherService);
  search() {
    if (this.searchInput.value) {
      this.apiWeather
        .getLatLon(this.searchInput.value)
        .pipe(
          first(),
          map((res) => {
            if (typeof res === 'object' && res instanceof Observable) {
              this.errorMessage$ = res;
            } else {
              this.errorMessage$ = null;
              this.apiWeather.getWeather(res as LatLonEntity);
            }
            return res;
          })
        )
        .subscribe();
    }
  }

  onFormSubmit(value: Event) {
    const inputElement = value.target as HTMLInputElement;

    if (inputElement.value == 'hourly') {
      this.router.navigate(['hourly']);
    } else {
      this.router.navigate(['daily']);
    }
  }
}
