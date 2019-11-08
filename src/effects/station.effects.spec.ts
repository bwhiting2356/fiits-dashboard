import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { StationEffects } from './station.effects';
import { FetchStationsFailure, FetchStations, FetchStationsSuccess } from 'src/app/actions/stations.actions';
import { mockStations } from '../testing/mock-stations';
import { StationService } from 'src/app/station.service';

describe('Station Effects success', () => {
    let actions$: Observable<any>;
    let effects: StationEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            provideMockActions(() => actions$),
            {
              provide: StationService,
              useValue: {
                fetchAllStation$: () => of(mockStations)
              }
            },
            StationEffects,
          ]
        });

        effects = TestBed.get<StationEffects>(StationEffects);
    });

    it('should call the service to fetch the stations, return fetch stations success', async () => {
        const action = new FetchStations();
        actions$ = cold('--a-', { a: action });
        const completion = new FetchStationsSuccess(mockStations);
        const expected = cold('--b', { b: completion });
        expect(effects.fetchStation$).toBeObservable(expected);
    });
});

describe('Station Effects error', () => {
  let actions$: Observable<any>;
  let effects: StationEffects;

  const error = new Error();

  beforeEach(() => {
    const errorResponse = cold('#|', {}, error);
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: StationService,
          useValue: {
            fetchAllStation$: () => errorResponse
          }
        },
        StationEffects,
      ]
    });

    effects = TestBed.get<StationEffects>(StationEffects);
  });

  it('should call the service to fetch the stations, return fetch stations error', async () => {
      const action = new FetchStations();
      actions$ = cold('--a-', { a: action });
      const completion = new FetchStationsFailure(error);
      const expected = cold('--b', { b: completion });
      expect(effects.fetchStation$).toBeObservable(expected);
  });
});
