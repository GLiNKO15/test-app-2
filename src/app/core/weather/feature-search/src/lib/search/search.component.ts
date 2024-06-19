import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../../../core/data-access/services/weather.service';
import { Observable, first, map } from 'rxjs';
import { LatLonEntity } from '../../../../core/data-access/interfaces/weather.types';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weather-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html'
})
export class WeatherSearch {
  public readonly searchInput = new FormControl('', Validators.required);
  public errorMessage$: Observable<string> | null = null;
  private readonly router = inject(Router);
  private readonly apiWeather = inject(WeatherService);

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
    this.router.navigate([inputElement.value]);
  }
}