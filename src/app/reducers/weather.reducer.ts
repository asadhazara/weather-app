import { Action, createReducer, on } from '@ngrx/store';
import * as weatherActions from 'src/app/actions/weather.actions';
import { Weather } from '../models/weather.model';

const weatherReducer = createReducer<Weather>(
  {
    isSearching: true,
    isLoading: false,
    error: null,
    locations: [],
  },
  on(weatherActions.setSearching, (state) => ({
    ...state,
    isSearching: true,
    error: null,
  })),
  on(weatherActions.setLoading, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(weatherActions.setError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(weatherActions.AddLocation, (state, { location }) => {
    const foundIndex = state.locations.findIndex(loc => loc.city === location.city && loc.country === location.country);

    return {
      ...state,
      error: null,
      isSearching: false,
      isLoading: false,
      locations:
        foundIndex !== -1
        ? state.locations.map((loc, idx) => foundIndex === foundIndex ? location : loc)
        : [...state.locations, location]
    };
  }),
  on(weatherActions.RemoveLocation, (state, { index }) => {
    const locations = state.locations.filter((location, idx) => idx !== index);

    return locations.length > 0 ? { ...state, locations } : {...state, isSearching: true, locations } ;
  }),
);

export const reducer = (state: Weather | undefined, action: Action) => weatherReducer(state, action);
