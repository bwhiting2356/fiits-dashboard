import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { State } from './reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../app/reducers';
import { Store } from '@ngrx/store';
import { FetchStations, ChangeFilterValue } from './actions/stations.actions';
import { initialStationState } from './reducers/station.reducer';
import { mockStations } from 'src/mock-stations';
import { cold } from 'jasmine-marbles';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatGridListModule,
        MatCardModule,
        MatListModule,
      ],
      declarations: [
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

  it('should dispatch change filter value', () => {
    spyOn(store, 'dispatch');
    component.filterChange('123 Main Street');
    expect(store.dispatch).toHaveBeenCalledWith(new ChangeFilterValue('123 Main Street'));
  });

  // it('should return filtered stations where addresses match the value', () => {
  //   const originalStations = mockStations;
  //   const filteredStations = component.filterStations('main', originalStations);
  //   expect(filteredStations).toEqual(mockStations[0]);
  // });
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
