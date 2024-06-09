import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem, updateItem } from '../store/items.actions';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  @Output() drawerModeChanged = new EventEmitter<boolean>();
  @Input() selectedItem: Item | null = null;

  tagForm: FormGroup;
  isDrawerOpen: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required],
      description: [''],
    });
  }

  ngOnChanges() {
    if (this.selectedItem) {
      this.tagForm.patchValue({
        name: this.selectedItem.name,
        color: this.selectedItem.color,
        description: this.selectedItem.description,
      });
    }
  }

  onSubmit() {
    if (this.tagForm.valid) {
      const newItem: Item = {
        id: this.selectedItem?.id || this.generateId(),
        name: this.tagForm.value.name,
        color: this.tagForm.value.color,
        description: this.tagForm.value.description,
        createDate: this.getCurrentDate(),
        lastUpdate: this.getCurrentDate(),
        createdBy: 'User Test',
      };

      if (this.selectedItem) {
        this.editItem(newItem);
      } else {
        this.addItem(newItem);
      }

      this.resetForm();
      this.closeDrawer();
    }
  }

  private editItem(updatedItem: Item) {
    this.store.dispatch(updateItem({ updatedItem }));
    console.log('Item updated in store:', updatedItem);
  }

  private addItem(newItem: Item) {
    this.store.dispatch(addItem({ newItem }));
    console.log('Item added to store:', newItem);
  }

  public closeDrawer() {
    this.isDrawerOpen = false;
    this.drawerModeChanged.emit(this.isDrawerOpen);
  }

  private resetForm() {
    this.tagForm.reset({
      name: '',
      color: '#000000',
      description: '',
    });
  }

  private generateId(): string {
    return new Date().getTime().toString();
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
