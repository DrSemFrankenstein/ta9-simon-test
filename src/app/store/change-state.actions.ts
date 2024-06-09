import { createAction, props } from '@ngrx/store';

export const changeState = createAction(
  '[State Change] Change State',
  props<{ newState: any }>()
);
export const changeStateSuccess = createAction(
  '[State Change] Change State Success'
);
export const changeStateFailure = createAction(
  '[State Change] Change State Failure',
  props<{ error: any }>()
);
