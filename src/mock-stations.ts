import { StationInfo } from './app/models/station-info.model';

export const mockStations: StationInfo[] = [
    {
        id: 1,
        capacity: 10,
        currentInventory: 5,
        address: '123 Main Street',
        latLng: {
            lat: 40.743647,
            lng: -74.003238,
        }
    },
    {
        id: 2,
        capacity: 10,
        currentInventory: 5,
        address: '576 Market Street',
        latLng: {
            lat: 40.753647,
            lng: -74.013238,
        }
    }
];
