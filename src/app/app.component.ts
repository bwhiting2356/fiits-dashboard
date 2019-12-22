import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { FetchStations, ChangeFilterValue, SetSelectedStationIndex } from './actions/stations.actions';
import { Observable, Subject, combineLatest } from 'rxjs';
import { StationInfo } from './models/station-info.model';
import { debounceTime, map } from 'rxjs/operators';
import { Event } from './models/event.model';
import { selectStationIndex, selectFilterValue, selectStations, selectFilteredStations } from './reducers/station.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stations: Observable<StationInfo[]>;
  stationsFetching: Observable<boolean>;
  filteredStations: Observable<StationInfo[]>;
  filterValueChanges = new Subject<string>();
  filterValue: Observable<string>;
  selectedIndex: Observable<number>;
  eventsFetching: Observable<boolean>;
  stationEvents: Observable<Event[]>;
  placeholderText: Observable<string>;

  constructor(private store: Store<State>) {
    this.stations = store.select(selectStations);
    this.filterValueChanges.pipe(
      debounceTime(100),
    ).subscribe(val => {
      this.store.dispatch(new ChangeFilterValue(val));
    });

    this.selectedIndex = store.select(selectStationIndex);
    this.filterValue = store.select(selectFilterValue);
    this.filteredStations = store.select(selectFilteredStations);

    this.eventsFetching = store.select(state => state.station.eventsFetching);
    this.stationsFetching = store.select(state => state.station.fetching);
    this.stationEvents = store.select(state => state.station.stationEvents);

    this.placeholderText = store.select(state => state.station.selectedStationIndex)
          .pipe(map(index => index === undefined ? 'Select a station' : 'No events for this station'));
  }

  filterChange(value: string) {
    this.filterValueChanges.next(value);
  }

  ngOnInit() {
    this.store.dispatch(new FetchStations());
  }

  selectStation(index: number) {
    this.store.dispatch(new SetSelectedStationIndex(index));
  }
}
