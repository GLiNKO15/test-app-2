export interface LatLonInterface {
  country: string;
  lat: number;
  lon: number;
  local_names: {
    [key: string]: string;
  };
  name: string;
  state: string;
};

export type LatLonEntity = Pick<LatLonInterface, 'lat'| 'lon'>;