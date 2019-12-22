export interface LatLng {
  lat: number;
  lng: number;
}

export interface StationInfo {
  id: number;
  capacity: number;
  currentInventory: number;
  address: string;
  lat: number;
  lng: number;
}
