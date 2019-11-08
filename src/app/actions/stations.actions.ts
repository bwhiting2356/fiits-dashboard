import { Action } from '@ngrx/store';
import { StationInfo } from '../models/station-info.model';
import { Event } from '../models/event.model';

export enum StationsActionTypes {
  ChangeFilterValue = '[Stations] Change Filter Value',
  FetchEventsSuccess = '[Stations] Fetch Events Success',
  FetchEventsError = '[Stations] Fetch Events Error',
  FetchStations = '[Stations] Load FetchStations',
  FetchStationsSuccess = '[Stations] FetchStations Success',
  FetchStationsFailure = '[Stations] FetchStations Failure',
  SetSelectedStationIndex = '[Stations] Set Selected Station Index'
}

export class ChangeFilterValue implements Action {
  readonly type = StationsActionTypes.ChangeFilterValue;
  constructor(public value: string) { }
}

export class FetchEventsSuccess implements Action {
  readonly type = StationsActionTypes.FetchEventsSuccess;
  constructor(public events: Event[]) {}
}

export class FetchEventsError implements Action {
  readonly type = StationsActionTypes.FetchEventsError;
  constructor(public error: any) {}
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

export class SetSelectedStationIndex implements Action {
  readonly type = StationsActionTypes.SetSelectedStationIndex;
  constructor(public index: number) {}
}

export type StationsActions = ChangeFilterValue
                        | FetchEventsSuccess
                        | FetchEventsError
                        | FetchStations
                        | FetchStationsSuccess
                        | FetchStationsFailure
                        | SetSelectedStationIndex;

