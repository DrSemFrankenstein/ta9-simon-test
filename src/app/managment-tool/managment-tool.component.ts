import { Component, EventEmitter, Output } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { CreateNewComponent } from '../create-new/create-new.component';
import { EditComponent } from '../edit/edit.component';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-managment-tool',
  standalone: true,
  imports: [CommonModule, DrawerComponent, CreateNewComponent, EditComponent],
  templateUrl: './managment-tool.component.html',
  styleUrl: './managment-tool.component.css',
})
export class ManagmentToolComponent {
  @Output() listModeChanged = new EventEmitter<boolean>();
  selectedItem: Item | null = null;
  isDrawerOpen: boolean = false;
  isListMode: boolean = true;

  constructor() {}

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  isList(isListMode: boolean) {
    this.isListMode = isListMode;
    this.listModeChanged.emit(this.isListMode);
  }
}
