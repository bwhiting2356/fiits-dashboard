import { stationReducer, initialStationState } from './station.reducer';
import {
  FetchStations,
  FetchStationsSuccess,
  FetchStationsFailure,
  ChangeFilterValue,
  SetSelectedStationIndex,
  FetchEventsSuccess,
  FetchEventsError
} from '../actions/stations.actions';

import { mockStations } from '../../testing/mock-stations';
import { mockEvents } from 'src/testing/mock-events';

describe('Station Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = stationReducer(initialStationState, action);

      expect(result).toBe(initialStationState);
    });
  });

  describe('actions', () => {
    it('should set fetching to true', () => {
      const action = new FetchStations();

      const result = stationReducer(initialStationState, action);

      expect(result).toEqual({
        ...initialStationState,
        fetching: true
      });
    });

    it('should set fetching to false, save the stations, set fetching to false', () => {
      const initialStateWithFetching = {
        ...initialStationState,
        fetching: true,
      };

      const action = new FetchStationsSuccess(mockStations);

      const result = stationReducer(initialStateWithFetching, action);

      expect(result).toEqual({
        ...initialStationState,
        stations: mockStations,
        fetching: false
      });
    });

    it('should set fetching to false, save the error', () => {
      const action = new FetchStationsFailure('oops');

      const result = stationReducer(initialStationState, action);

      expect(result).toEqual({
        ...initialStationState,
        error: 'oops',
        fetching: false
      });
    });

    it('should change the current filter value, set the selected station index to undefined', () => {
      const initialStateWithStationIndex = {
        ...initialStationState,
        selectedStationIndex: 42
      };

      const action = new ChangeFilterValue('123 Main Street');

      const result = stationReducer(initialStateWithStationIndex, action);

      expect(result).toEqual({
        ...initialStationState,
        filterValue: '123 Main Street',
        selectedStationIndex: undefined
      });
    });

    it('should set the selected station index to the number, set eventsFetching to true', () => {
      const action = new SetSelectedStationIndex(42);

      const result = stationReducer(initialStationState, action);

      expect(result).toEqual({
        ...initialStationState,
        selectedStationIndex: 42,
        eventsFetching: true
      });
    });

    it('should save the events, set eventsFetching to false', () => {
      const initialStateWithFetching = {
        ...initialStationState,
        eventsFetching: true
      };
      const action = new FetchEventsSuccess(mockEvents);

      const result = stationReducer(initialStateWithFetching, action);

      expect(result).toEqual({
        ...initialStationState,
        stationEvents: mockEvents,
        eventsFetching: false
      });
    });

    it('should save the error from trying to fetch events, set eventsFetching to false', () => {
      const initialStateWithFetching = {
        ...initialStationState,
        eventsFetching: true
      };

      const action = new FetchEventsError('oops');

      const result = stationReducer(initialStateWithFetching, action);

      expect(result).toEqual({
        ...initialStationState,
        error: 'oops',
        eventsFetching: false
      });
    });
  });
});
