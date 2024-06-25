import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../../../ui/weather.pipe';
import { WeatherStateService } from '../../../../core/data-access/services/weather-state.service';

@Component({
  selector: 'weather-hourly-table',
  standalone: true,
  templateUrl: './weather-hourly.component.html',
  imports: [CommonModule, TemperaturePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherHourlyTable {
  private readonly WeatherService = inject(WeatherStateService);
  public readonly weatherNameLocation$ = this.WeatherService.weatherNameLocation$;
  public readonly hourly$ = this.WeatherService.weatherHourly$;

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
