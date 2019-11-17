import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { ChartsModule } from 'ng2-charts';
import { mockEvents } from 'src/testing/mock-events';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ChartsModule ],
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should turn the events list into an array of datasets', () => {
    const events = mockEvents;
    const datasets = component.mapEventsToDatasets(events);
    expect(datasets).toEqual([
      {
        data: [
          {
              x: new Date(mockEvents[0].time),
              y: mockEvents[0].potentialHighInv
          },
          {
              x: new Date(mockEvents[1].time),
              y: mockEvents[1].potentialHighInv
          }
        ],
        label: 'Potential High Inventory'
      },
      {
        data: [
          {
            x: new Date(mockEvents[0].time),
            y: mockEvents[0].potentialLowInv
          },
          {
            x: new Date(mockEvents[1].time),
            y: mockEvents[1].potentialLowInv
          }

        ],
        label: 'Potential Low Inventory'
      }
    ]);
  })
});
