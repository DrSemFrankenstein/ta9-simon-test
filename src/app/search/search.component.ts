import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();

  constructor() {}

  onSearch(value: string) {
    this.searchQuery.emit(value);
  }
}
