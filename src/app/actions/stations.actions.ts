import { Action } from '@ngrx/store';
import { StationInfo } from '../models/station-info.model';

export enum StationsActionTypes {
  ChangeFilterValue = '[Stations] Change Filter Value',
  FetchStations = '[Stations] Load FetchStations',
  FetchStationsSuccess = '[Stations] FetchStations Success',
  FetchStationsFailure = '[Stations] FetchStations Failure',
}

export class ChangeFilterValue implements Action {
  readonly type = StationsActionTypes.ChangeFilterValue;
  constructor(public value: string) { }
}

export class FetchStations implements Action {
  readonly type = StationsActionTypes.FetchStations;
}

export class FetchStationsSuccess implements Action {
  readonly type = StationsActionTypes.FetchStationsSuccess;
  constructor(public stations: StationInfo[]) { }
}

export class FetchStationsFailure implements Action {
  readonly type = StationsActionTypes.FetchStationsFailure;
  constructor(public payload: any) { }
}

export type StationsActions = ChangeFilterValue
                        | FetchStations
                        | FetchStationsSuccess
                        | FetchStationsFailure;

