import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Output() search = new EventEmitter();

  city = '';

  weather$ = this.store.select('weather');

  error$ = this.weather$.pipe(map(weather => weather.error));

  constructor(private store: Store<AppState>) {}

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  onSubmit(): void {
    this.search.emit(this.city);
  }
}
