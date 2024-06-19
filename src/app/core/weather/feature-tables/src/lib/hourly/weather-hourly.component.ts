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
import { WeatherService } from '../../../../core/data-access/services/weather.service';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../../../ui/weather.pipe';

@Component({
  selector: 'weather-hourly-table',
  standalone: true,
  templateUrl: './weather-hourly.component.html',
  imports: [CommonModule, TemperaturePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHoulyTable{
  private readonly WeatherService = inject(WeatherService);
  public readonly weatherNameLocation$ = this.WeatherService.weatherNameLocation$;
  public readonly hourly$ = this.WeatherService.weatherHourly$;

  trackByFn(index: number, item: any): number{
    return item.id;
  }
}
