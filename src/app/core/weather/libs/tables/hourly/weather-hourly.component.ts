import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { DTOWeatherData } from '../../services/weather.types';
import { TemperaturePipe } from '../../pipes/weather.pipe';

@Component({
  selector: 'weather-hourly-table',
  standalone: true,
  templateUrl: './weather-hourly.component.html',
  imports: [CommonModule, TemperaturePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHoulyTable implements DoCheck {
  WeatherService = inject(WeatherService);
  weatherNameLocation = this.WeatherService.weatherNameLocation$.value;
  hourly$ = this.WeatherService.weatherHourly$;

  ngDoCheck(): void {
    this.weatherNameLocation = this.WeatherService.weatherNameLocation$.value;
  }
  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
