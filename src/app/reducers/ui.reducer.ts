import { createReducer, on } from "@ngrx/store";
import { startLoading, stopLoading } from "./ui.reducer.actions";

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(startLoading, () => ({isLoading: true})),
  on(stopLoading, () => ({isLoading: false})),
);

export const getIsLoading = (state: State) => state.isLoading;