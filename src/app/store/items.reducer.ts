import { createReducer, on } from '@ngrx/store';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  updateItem,
} from './items.actions';
import { addItem } from './items.actions';
import { Item } from '../models/item.model';

export interface ItemsState {
  items: Item[];
  loading: boolean;
  error: any;
}

export const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(loadItems, (state) => ({ ...state, loading: true })),
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    items,
  })),
  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addItem, (state, { newItem }) => ({
    ...state,
    items: [
      ...state.items,
      { ...newItem, id: new Date().getTime().toString() },
    ],
  })),
  on(updateItem, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    ),
  }))
);
