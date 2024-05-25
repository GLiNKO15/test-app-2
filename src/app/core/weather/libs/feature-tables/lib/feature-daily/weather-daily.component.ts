import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
} from '@angular/core';
import { WeatherService } from '../../../data-access/services/weather.service';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../ui/lib/pipes/weather.pipe';

@Component({
  selector: 'weather-daily-table',
  standalone: true,
  templateUrl: './weather-daily.component.html',
  imports: [CommonModule, TemperaturePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDailyTable {
  private readonly WeatherService = inject(WeatherService);
  public readonly dailys$ = this.WeatherService.weatherDaily$;
  public readonly weatherNameLocation$ =
    this.WeatherService.weatherNameLocation$;

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
