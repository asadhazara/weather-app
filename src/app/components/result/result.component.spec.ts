import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { WeatherEffects } from 'src/app/effects/weather.effects';
import { reducer as weatherReducer } from 'src/app/reducers/weather.reducer';
import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot<AppState>({ weather: weatherReducer }),
        EffectsModule.forRoot([WeatherEffects]),
      ],
      declarations: [ ResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
