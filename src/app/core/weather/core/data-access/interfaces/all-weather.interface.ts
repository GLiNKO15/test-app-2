export interface AllWeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;

  hourly: {
    dt: number;
    temp: number;
  }[];
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

