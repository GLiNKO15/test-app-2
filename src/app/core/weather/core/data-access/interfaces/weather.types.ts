export interface LatLonInfo {
  country: string;
  lat: number;
  lon: number;
  local_names: {
    [key: string]: string;
  };
  name: string;
  state: string;
}

export type LatLonEntity = Pick<LatLonInfo, 'lat'| 'lon'>;