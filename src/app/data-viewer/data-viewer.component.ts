import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ItemsState } from '../store/items.reducer';
import { loadItems } from '../store/items.actions';
import { DrawerComponent } from '../drawer/drawer.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-data-viewer',
  standalone: true,
  imports: [CommonModule, DrawerComponent, EditComponent],
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css'],
})
export class DataViewerComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';
  @Input() isListMode: boolean = false;
  @Input() selectedItem: Item | null = null;
  @Output() editItem = new EventEmitter<Item>();
  items$: Observable<Item[]> = this.store.pipe(
    select((state) => state.items.items)
  );
  items: Item[] = [];
  filteredItems: Item[] = [];
  paginatedItems: Item[] = [];
  selectedItemIndex: number | null = null;
  isDrawerOpen: boolean = false;

  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  isAscending: boolean = true;

  constructor(private store: Store<{ items: ItemsState }>) {}

  ngOnInit(): void {
    this.store.dispatch(loadItems());
    this.items$.subscribe((items) => {
      this.items = items;
      this.updateItemsPerPage();
      this.filterItems(this.searchQuery);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
      this.filterItems(changes['searchQuery'].currentValue);
    }
    if (changes['isListMode'] && !changes['isListMode'].firstChange) {
      this.updateItemsPerPage();
      this.filterItems(this.searchQuery);
    }
  }

  selectItem(item: Item) {
    this.selectedItem = item;
    this.editItem.emit(item);
    this.toggleDrawer();
  }

  onDrawerModeChanged(isOpen: boolean) {
    this.isDrawerOpen = isOpen;
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  updateItemsPerPage() {
    this.itemsPerPage = this.isListMode ? 5 : 10;
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  filterItems(searchText: string) {
    if (!searchText.trim()) {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    this.sortItems();
    this.currentPage = 1;
    this.updateItemsPerPage();
    this.updatePaginatedItems();
  }

  sortItems() {
    this.filteredItems.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return this.isAscending ? -1 : 1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  toggleSortOrder() {
    this.isAscending = !this.isAscending;
    this.sortItems();
  }
}
