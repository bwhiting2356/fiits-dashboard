import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { StationsActions, StationsActionTypes, FetchStationsSuccess, FetchStationsFailure } from 'src/app/actions/stations.actions';
import { StationService } from 'src/app/station.service';

@Injectable()
export class StationEffects {

    @Effect()
    fetchStation$: Observable<Action> = this.actions$.pipe(
      ofType(StationsActionTypes.FetchStations),
      switchMap(() => this.stationService.fetchAllStation$().pipe(
        map(stations => new FetchStationsSuccess(stations)),
        catchError(error => of(new FetchStationsFailure(error)))
      ))
    );

    constructor(
        private stationService: StationService,
        private actions$: Actions<StationsActions>) {}
}
