import { createAction, props } from '@ngrx/store';
import { Location } from 'src/app/models/location.model';
import { AppError } from '../models/app-error.model';

export const SET_IS_SEARCHING = '[WEATHER] SEARCHING';
export const SET_IS_LOADING = '[WEATHER] LOADING';
export const START_FETCHING = '[WEATHER] FETCHING';
export const ADD_LOCATION = '[WEATHER] ADD';
export const SET_ERROR = '[WEATHER] ERROR';
export const REMOVE_LOCATION = '[WEATHER] REMOVE';

export const setSearching = createAction(SET_IS_SEARCHING);
export const setLoading = createAction(SET_IS_LOADING);
export const startFetching = createAction(START_FETCHING, props<{ city: string }>());
export const setError = createAction(SET_ERROR, props<{ error: AppError }>());
export const AddLocation = createAction(ADD_LOCATION, props<{ location: Location }>());
export const RemoveLocation = createAction(REMOVE_LOCATION, props<{ index: number }>());
