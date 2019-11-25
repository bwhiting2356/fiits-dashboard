import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { FetchStations, ChangeFilterValue, SetSelectedStationIndex } from './actions/stations.actions';
import { Observable, Subject, combineLatest } from 'rxjs';
import { StationInfo } from './models/station-info.model';
import { debounceTime, map } from 'rxjs/operators';
import { Event } from './models/event.model';

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

  constructor(private store: Store<State>) {
    this.stations = store.select(state => state.station.stations);
    this.filterValueChanges.pipe(
      debounceTime(100),
    ).subscribe(val => {
      this.store.dispatch(new ChangeFilterValue(val));
    });

    this.selectedIndex = store.select(state => state.station.selectedStationIndex);
    this.filterValue = store.select(state => state.station.filterValue);
    this.filteredStations = combineLatest([
      this.filterValue,
      this.stations
    ]).pipe(
      map(([value, stations]) => this.filterStations(value, stations))
    );

    this.eventsFetching = store.select(state => state.station.eventsFetching);
    this.stationsFetching = store.select(state => state.station.fetching);
    this.stationEvents = store.select(state => state.station.stationEvents);
  }

  filterChange(value: string) {
    this.filterValueChanges.next(value);
  }

  ngOnInit() {
    this.store.dispatch(new FetchStations());
  }

  filterStations(value: string, stations: StationInfo[]) {
    return stations.filter(station => station.address.toLowerCase().includes(value.toLowerCase()));
  }

  selectStation(index: number) {
    this.store.dispatch(new SetSelectedStationIndex(index));
  }
}
