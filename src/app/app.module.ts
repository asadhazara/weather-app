import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ResultComponent } from 'src/app/components/result/result.component';
import { reducer as weatherReducer } from './reducers/weather.reducer';
import { AppState } from 'src/app/app.state';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherEffects } from './effects/weather.effects';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({ weather: weatherReducer }),
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
