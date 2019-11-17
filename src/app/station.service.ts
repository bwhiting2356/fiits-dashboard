import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './models/event.model';
import { StationInfo } from './models/station-info.model';
import { of } from 'rxjs';
import { mockEvents } from 'src/testing/mock-events';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  BACKEND_URL = 'https://fiits-backend.herokuapp.com';

  constructor(
    private http: HttpClient) { }

  fetchAllStation$() {
    return this.http.get<StationInfo[]>(`${this.BACKEND_URL}/stations`);
  }

  fetchEventsForStation$(stationId: number) {
    return of(mockEvents);
    // return this.http.get<Event[]>(`${this.BACKEND_URL}/station-events/${stationId}`);
  }
}
