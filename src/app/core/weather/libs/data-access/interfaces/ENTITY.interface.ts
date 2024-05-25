import { DTOWeatherData } from './DTO-weather.interface';

export type HourlyWeather = Pick<DTOWeatherData, "hourly">;

export type DailyWeather = Pick<DTOWeatherData, "daily">;