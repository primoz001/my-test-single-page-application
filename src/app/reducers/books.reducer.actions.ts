import { props, createAction } from '@ngrx/store';
import { Book } from '../models/main-models';

export const SET_AVAILABLE_BOOKS = '[Books] Set Available Books';
export const ADD_FAVOURITE_BOOK = '[Books] Add Favourite Book';
export const REMOVE_FAVOURITE_BOOK = '[Books] Remove Favourite Book';
export const SET_BOOK_DETAIL = '[Books] Set book details';
export const SET_SEARCH_CRITERIA = '[Books] Set search criteria';

export const setAvailableBooks = createAction(
  SET_AVAILABLE_BOOKS,
  props<{ payload: Book[] }>(),
);

export const addFavouriteBook = createAction(
  ADD_FAVOURITE_BOOK,
  props<{ payload: Book }>(),
);

export const removeFavouriteBook = createAction(
  REMOVE_FAVOURITE_BOOK,
  props<{ payload: Book }>(),
);

export const setBookDetail = createAction(
  SET_BOOK_DETAIL,
  props<{ payload: Book }>(),
);

export const setSearchCriteria = createAction(
  SET_SEARCH_CRITERIA,
  props<{ payload: string }>(),
);
