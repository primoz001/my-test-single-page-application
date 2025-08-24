import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  setAvailableBooks,
  addFavouriteBook,
  removeFavouriteBook,
  setBookDetail,
  setSearchCriteria,
} from './books.reducer.actions';
import { Book } from '../models/main-models';

export interface BooksState {
  availableBooks: Book[];
  filteredBooks: Book[];
  favouriteBooks: Book[];
  selectedBookDetail: Book | null;
  searchCriteria: string;
}

const initialState: BooksState = {
  availableBooks: [],
  filteredBooks: [],
  favouriteBooks: [],
  selectedBookDetail: null,
  searchCriteria: '',
};

export const booksReducer = createReducer(
  initialState,
  on(setAvailableBooks, (state, { payload }) => ({
    ...state,
    availableBooks: payload,
    filteredBooks: payload,
  })),
  on(addFavouriteBook, (state, { payload }) => ({
    ...state,
    favouriteBooks: addBookToFavourites(state.favouriteBooks, payload),
  })),
  on(removeFavouriteBook, (state, { payload }) => ({
    ...state,
    favouriteBooks: removeBookFromFavourites(state.favouriteBooks, payload),
  })),
  on(setBookDetail, (state, { payload }) => ({
    ...state,
    selectedBookDetail: payload,
  })),
  on(setSearchCriteria, (state, { payload }) => ({
    ...state,
    searchCriteria: payload,
    filteredBooks:
      state.availableBooks.filter((x) =>
        x?.name.toUpperCase().includes(payload.toUpperCase())
      ) ?? state.availableBooks,
  }))
);

export const getBooksState = createFeatureSelector<BooksState>('books');

export const getAvailableBooks = createSelector(
  getBooksState,
  (state: BooksState) => state.availableBooks
);
export const getFilteredBooks = createSelector(
  getBooksState,
  (state: BooksState) => state.filteredBooks
);
export const getFavouriteBooks = createSelector(
  getBooksState,
  (state: BooksState) => state.favouriteBooks
);
export const getSelectedBookDetail = createSelector(
  getBooksState,
  (state: BooksState) => state.selectedBookDetail
);
export const getSearchCriteria = createSelector(
  getBooksState,
  (state: BooksState) => state.searchCriteria
);

/**
 * Add book to favourites
 * @param favouriteBooks Book[]
 * @param book Book
 * @returns {Book[]}
 */
function addBookToFavourites(favouriteBooks: Book[], book: Book): Book[] {
  const newFavouriteBooks: Book[] = [...favouriteBooks];
  if (book) {
    const favouriteBook = newFavouriteBooks.find((x) => x.isbn === book.isbn);
    if (!favouriteBook) {
      newFavouriteBooks.push(book);
    }
  }

  return newFavouriteBooks;
}

/**
 * Remove book from favourites
 * @param favouriteBooks Book[]
 * @param book Book
 * @returns {Book[]}
 */
function removeBookFromFavourites(favouriteBooks: Book[], book: Book): Book[] {
  let newFavouriteBooks: Book[] = [...favouriteBooks];
  if (book) {
    newFavouriteBooks.splice(
      newFavouriteBooks.findIndex((x) => x.isbn === book.isbn),
      1
    );
  }

  return newFavouriteBooks;
}
