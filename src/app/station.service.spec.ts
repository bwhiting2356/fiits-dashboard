import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StationService } from './station.service';
import { mockStations } from '../testing/mock-stations';
import { mockEvents } from '../testing/mock-events';

describe('StationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [StationService]
  }));

  it('should be created', () => {
    const service: StationService = TestBed.get(StationService);
    expect(service).toBeTruthy();
  });

  it('should fetch the stations', inject(
    [HttpTestingController, StationService],
    (httpMock: HttpTestingController, stationsService: StationService) => {
      stationsService.fetchAllStation$().subscribe(stations => {
        expect(stations).toEqual(mockStations);
      });

      const mockReq = httpMock.expectOne(`${stationsService.BACKEND_URL}/stations`);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockStations);

      httpMock.verify();
  }));

  it('should fetch events for the station', inject(
    [HttpTestingController, StationService],
    (httpMock: HttpTestingController, stationService: StationService) => {
      stationService.fetchEventsForStation$(1).subscribe(events => {
        expect(events).toEqual(mockEvents);
      })
    }
  ))
});
