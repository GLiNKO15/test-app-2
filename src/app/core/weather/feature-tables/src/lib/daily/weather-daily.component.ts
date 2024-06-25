import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../../../ui/weather.pipe';
import { WeatherStateService } from '../../../../core/data-access/services/weather-state.service';

@Component({
  selector: 'weather-daily-table',
  standalone: true,
  templateUrl: './weather-daily.component.html',
  imports: [CommonModule, TemperaturePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDailyTable {
  private readonly WeatherStateService = inject(WeatherStateService);
  public readonly dailys$ = this.WeatherStateService.weatherDaily$;
  public readonly weatherNameLocation$ =
    this.WeatherStateService.weatherNameLocation$;

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
