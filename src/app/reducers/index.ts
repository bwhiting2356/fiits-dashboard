import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StationState, stationReducer, initialStationState } from './station.reducer';


export interface State {
  station: StationState;
}

export const initialState: State = {
  station: initialStationState,
};

export const reducers: ActionReducerMap<State> = {
  station: stationReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
