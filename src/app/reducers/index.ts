import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StationState, stationReducer, stationFeatureKey, initialStationState } from './station.reducer';


export interface State {
  [stationFeatureKey]: StationState;
}

export const initialState: State = {
  [stationFeatureKey]: initialStationState,
};

export const reducers: ActionReducerMap<State> = {
  [stationFeatureKey]: stationReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
