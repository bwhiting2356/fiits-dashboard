import { StationInfo } from '../models/station-info.model';
import { StationsActionTypes, StationsActions } from '../actions/stations.actions';

export const stationFeatureKey = 'station';

export interface StationState {
  stations: StationInfo[];
  fetching: boolean;
  error: any;
  filterValue: string;
}

export const initialStationState: StationState = {
  stations: [],
  fetching: false,
  error: undefined,
  filterValue: ''
};

export function stationReducer(state = initialStationState, action: StationsActions): StationState {
  switch (action.type) {
    case StationsActionTypes.ChangeFilterValue:
      return {
        ...state,
        filterValue: action.value
      };
    case StationsActionTypes.FetchStations:
      return {
        ...state,
        fetching: true
      };
    case StationsActionTypes.FetchStationsSuccess:
      return {
        ...state,
        fetching: false,
        stations: action.stations
      };

    case StationsActionTypes.FetchStationsFailure:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}
