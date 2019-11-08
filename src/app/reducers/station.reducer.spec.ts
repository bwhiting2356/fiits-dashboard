import { stationReducer, initialStationState } from './station.reducer';
import { FetchStations, FetchStationsSuccess, FetchStationsFailure, ChangeFilterValue } from '../actions/stations.actions';
import { StationInfo } from '../models/station-info.model';

import { mockStations } from '../../mock-stations';

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

    it('should set fetching to false, save the stations', () => {
      const action = new FetchStationsSuccess(mockStations);

      const result = stationReducer(initialStationState, action);

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

    it('should change the current filter value', () => {
      const action = new ChangeFilterValue('123 Main Street');

      const result = stationReducer(initialStationState, action);

      expect(result).toEqual({
        ...initialStationState,
        filterValue: '123 Main Street'
      });
    })
  })
});
