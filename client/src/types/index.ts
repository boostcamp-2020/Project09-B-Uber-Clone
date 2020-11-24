import { string } from 'yargs';

export interface Location {
  lat: number;
  lng: number;
}

export interface Marker extends Location {
  color: string;
}
