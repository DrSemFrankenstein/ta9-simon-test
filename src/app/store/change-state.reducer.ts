import { createReducer, on } from '@ngrx/store';
import {
  changeState,
  changeStateSuccess,
  changeStateFailure,
} from './change-state.actions';

export interface ChangeState {
  state: any;
  loading: boolean;
  error: any;
}

export const initialChangeState: ChangeState = {
  state: null,
  loading: false,
  error: null,
};

export const changeStateReducer = createReducer(
  initialChangeState,
  on(changeState, (state) => ({ ...state, loading: true })),
  on(changeStateSuccess, (state) => ({ ...state, loading: false })),
  on(changeStateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
