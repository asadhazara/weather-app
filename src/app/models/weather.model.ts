import { AppError } from './app-error.model';
import { Location } from './location.model';

export interface Weather {
  isSearching: boolean;
  isLoading: boolean;
  locations: Location[];
  error: AppError | null;
}
