import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item.model';

export const loadItems = createAction('[Item List] Load Items');
export const loadItemsSuccess = createAction(
  '[Item List] Load Items Success',
  props<{ items: Item[] }>()
);
export const loadItemsFailure = createAction(
  '[Item List] Load Items Failure',
  props<{ error: any }>()
);

export const addItem = createAction(
  '[Item] Add Item',
  props<{ newItem: Item }>()
);

export const updateItem = createAction(
  '[Item] Update Item',
  props<{ updatedItem: Item }>()
);
