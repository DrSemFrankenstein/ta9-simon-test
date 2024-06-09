import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { DataViewerComponent } from './data-viewer/data-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataViewerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ta9-simon-test';
}
