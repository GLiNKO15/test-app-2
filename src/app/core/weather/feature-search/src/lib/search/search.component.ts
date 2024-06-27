import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherApiService } from '../../../../core/data-access/services/weather-api.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'weather-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSearch {
  searchStream$: Observable<unknown> = new Observable<unknown>();
  private readonly router = inject(Router);
  private readonly WeatherApiService = inject(WeatherApiService);
  private readonly destroyRef = inject(DestroyRef);

  search(str: string) {
    this.searchStream$ = this.WeatherApiService
      .getLatLon(str)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((value) => {
          if (typeof value == 'string') throw of(value);
          return value;
        }),
        map((res) => this.WeatherApiService.getWeather(res)),
        catchError((err) => err)
      );
  }

  onFormSubmit(value: Event) {
    const inputElement = value.target as HTMLInputElement;
    this.router.navigate([inputElement.value]);
  }
}