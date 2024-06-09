import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StateService } from '../services/state.service';
import {
  changeState,
  changeStateSuccess,
  changeStateFailure,
} from './change-state.actions';

@Injectable()
export class ChangeStateEffects {
  changeState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeState),
      mergeMap(({ newState }) =>
        this.stateService.changeState(newState).pipe(
          map(() => changeStateSuccess()),
          catchError((error) => of(changeStateFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private stateService: StateService) {}
}
