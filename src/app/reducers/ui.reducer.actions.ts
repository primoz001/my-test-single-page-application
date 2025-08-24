import { createAction } from "@ngrx/store";

export const START_LOADING = '[UI] Start loading';
export const STOP_LOADING = '[UI] Stop loading';

export const startLoading = createAction(
  START_LOADING,
);
export const stopLoading = createAction(
  STOP_LOADING,
);
