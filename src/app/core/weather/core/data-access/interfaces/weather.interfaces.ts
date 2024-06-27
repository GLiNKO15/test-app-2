export interface WeatherInterface {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface HourlyWeatherInterface extends WeatherInterface {
  hourly: {
    dt: number;
    temp: number;
  }[];
}

export interface DailyWeatherInterface extends WeatherInterface {
  daily: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    }
  }[];
}