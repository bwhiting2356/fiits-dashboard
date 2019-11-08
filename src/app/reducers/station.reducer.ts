import { StationInfo } from '../models/station-info.model';
import { StationsActionTypes, StationsActions } from '../actions/stations.actions';
import { Event } from '../models/event.model';

export const stationFeatureKey = 'station';

export interface StationState {
  stations: StationInfo[];
  fetching: boolean;
  error: any;
  filterValue: string;
  selectedStationIndex: number;
  eventsFetching: boolean;
  stationEvents: Event[];
}

export const initialStationState: StationState = {
  stations: [],
  fetching: false,
  error: undefined,
  filterValue: '',
  selectedStationIndex: undefined,
  eventsFetching: false,
  stationEvents: undefined
};

export function stationReducer(state = initialStationState, action: StationsActions): StationState {
  switch (action.type) {
    case StationsActionTypes.ChangeFilterValue:
      return {
        ...state,
        filterValue: action.value,
        selectedStationIndex: undefined
      };
    case StationsActionTypes.FetchEventsSuccess:
      return {
        ...state,
        stationEvents: action.events
      };

    case StationsActionTypes.FetchEventsError:
      return {
        ...state,
        error: action.error
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
    case StationsActionTypes.SetSelectedStationIndex:
      return {
        ...state,
        selectedStationIndex: action.index,
        eventsFetching: true
      };
    default:
      return state;
  }
}
