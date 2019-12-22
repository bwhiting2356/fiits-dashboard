import { StationInfo } from '../models/station-info.model';
import { StationsActionTypes, StationsActions } from '../actions/stations.actions';
import { Event } from '../models/event.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '.';


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
  stationEvents: []
};

const selectStationFeature = createFeatureSelector<State, StationState>('station');

export const selectStationIndex = createSelector(
  selectStationFeature,
  state => state.selectedStationIndex);

export const selectFilterValue = createSelector(
  selectStationFeature,
  state => state.filterValue);

export const selectStations = createSelector(
  selectStationFeature,
  state => state.stations);

export const selectFilteredStations = createSelector(
  selectFilterValue,
  selectStations,
  (value, stations) => {
    return stations.filter(station => station.address.toLowerCase().includes(value.toLowerCase()));
  }
);

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
        stationEvents: action.events,
        eventsFetching: false
      };

    case StationsActionTypes.FetchEventsError:
      return {
        ...state,
        error: action.error,
        eventsFetching: false
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
