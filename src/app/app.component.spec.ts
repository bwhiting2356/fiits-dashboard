import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { State } from './reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../app/reducers';
import { Store } from '@ngrx/store';
import { FetchStations, ChangeFilterValue, SetSelectedStationIndex } from './actions/stations.actions';
import { initialStationState } from './reducers/station.reducer';
import { mockStations } from '../testing/mock-stations';
import { cold } from 'jasmine-marbles';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatGridListModule,
        MatCardModule,
        MatListModule,
      ],
      declarations: [
        ChartComponent,
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();
    store = TestBed.get<Store<State>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch an action to fetch the stations on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new FetchStations());
  });

  it('should set the stations value from the store', () => {
    store.setState({
      ...initialState,
      station: {
        ...initialStationState,
        stations: mockStations
      }
    });
    fixture.detectChanges();
    const expected = cold('a', { a: mockStations } );
    expect(component.stations).toBeObservable(expected);
  });

  it('should dispatch change filter value', (done) => {
    spyOn(store, 'dispatch');
    component.filterChange('123 Main Street');
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(new ChangeFilterValue('123 Main Street'));
      done();
    }, 150);

  });

  it('should return filtered stations where addresses match the value', () => {
    const originalStations = mockStations;
    const filteredStations = component.filterStations('main', originalStations);
    expect(filteredStations).toEqual([mockStations[0]]);
  });

  it('should should dispatch an action to set the station index', () => {
    spyOn(store, 'dispatch');
    component.selectStation(42);
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedStationIndex(42));
  });

  it('should show the spinner if the stations are fetching', () => {
    store.setState({
      ...initialState,
      station: {
        ...initialStationState,
        fetching: true
      }
    });
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#station-list-container'))).toBeFalsy();
  });
});





/*



describe('AddressInputPage', () => {
  let component: AddressInputPage;
  let fixture: ComponentFixture<AddressInputPage>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInputPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: AutocompleteService,
          useValue: {
            getPlacePredictions$: () => of(mockAutocompleteResults)
          }
        },
        {
          provide: NavController,
          useValue: {
            back: () => {}
          }
        },
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
    store = TestBed.get<Store<State>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
*/
