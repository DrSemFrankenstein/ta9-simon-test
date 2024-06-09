import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem } from '../store/items.actions';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css'],
})
export class CreateNewComponent {
  @Output() DrawerModeChanged = new EventEmitter<boolean>();
  tagForm: FormGroup;
  isDrawerOpen: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.tagForm.valid) {
      const newItem: Item = {
        id: '',
        name: this.tagForm.value.name,
        color: this.tagForm.value.color,
        description: this.tagForm.value.description,
        createDate: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0],
        createdBy: 'User Test',
      };
      this.store.dispatch(addItem({ newItem }));
      console.log('Item added to store:', newItem);
      this.resetForm();
      this.closeDrawer();
    }
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.DrawerModeChanged.emit(this.isDrawerOpen);
    this.resetForm();
  }

  resetForm() {
    this.tagForm.reset({
      name: '',
      color: '#000000',
      description: '',
    });
  }
}
