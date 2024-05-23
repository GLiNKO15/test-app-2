import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../../pipes/weather.pipe';

@Component({
  selector: 'weather-daily-table',
  standalone: true,
  templateUrl: './weather-daily.component.html',
  imports: [CommonModule, TemperaturePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDailyTable implements DoCheck {
  ngDoCheck(): void {
    this.weatherNameLocation = this.WeatherService.weatherNameLocation$.value;
  }

  WeatherService = inject(WeatherService);
  dailys$ = this.WeatherService.weatherDaily$;
  weatherNameLocation = this.WeatherService.weatherNameLocation$.value;

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
