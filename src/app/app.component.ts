import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { FetchStations, ChangeFilterValue } from './actions/stations.actions';
import { Observable, Subject, combineLatest } from 'rxjs';
import { StationInfo } from './models/station-info.model';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stations: Observable<StationInfo[]>;
  filteredStations: Observable<StationInfo[]>;
  filterValueChanges = new Subject<string>();
  filterValue: Observable<string>;

  constructor(private store: Store<State>) {
    this.stations = store.select(state => state.station.stations);
    this.filterValueChanges.pipe(
      // debounceTime(400),
    ).subscribe(val => {
      this.store.dispatch(new ChangeFilterValue(val));
    });
    this.filterValue = store.select(state => state.station.filterValue);
    this.filteredStations = combineLatest([
      this.filterValue,
      this.stations
    ]).pipe(
      map(([value, stations]) => stations)
    );
  }

  filterChange(value: string) {
    this.filterValueChanges.next(value);
  }

  ngOnInit() {
    this.store.dispatch(new FetchStations());
  }

  filterStations(value: string, stations: StationInfo[]) {
    return stations;

  }
}
