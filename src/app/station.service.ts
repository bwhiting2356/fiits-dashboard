import { Injectable } from '@angular/core';
import { StationInfo } from './models/station-info.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  STATION_API_URL = 'https://fiits-backend.herokuapp.com/stations';

  constructor(private http: HttpClient) { }

  fetchAllStation$() {
    return this.http.get<StationInfo[]>(this.STATION_API_URL);
  }
}
