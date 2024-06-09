import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import {
  addItem,
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
} from './items.actions';

@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.itemService.getAll().pipe(
          map((items) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  addItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItem),
        tap(({ newItem }) => this.itemService.addItem(newItem))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private itemService: ItemService) {}
}
