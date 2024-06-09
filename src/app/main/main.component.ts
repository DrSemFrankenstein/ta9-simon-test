import { Component } from '@angular/core';
import { UrlFieldComponent } from '../url-field/url-field.component';
import { ManagmentToolComponent } from '../managment-tool/managment-tool.component';
import { SearchComponent } from '../search/search.component';
import { DataViewerComponent } from '../data-viewer/data-viewer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    UrlFieldComponent,
    ManagmentToolComponent,
    SearchComponent,
    DataViewerComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  isListMode: boolean = true;
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  toggleListMode(isListMode: boolean) {
    this.isListMode = isListMode;
  }

  handleSearch(query: string) {
    this.searchQuery = query;
  }
}
