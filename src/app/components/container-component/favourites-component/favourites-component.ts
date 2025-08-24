import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../../services/main-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromBooks from '../../../reducers/books.reducer';
import * as Books from '../../../reducers/books.reducer.actions';
import { Observable } from 'rxjs';
import { Book } from '../../../models/main-models';

@Component({
  selector: 'app-favourites-component',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './favourites-component.html',
  styleUrl: './favourites-component.css',
})
export class FavouritesComponent implements OnInit {
  mainService: MainService = inject(MainService);
  private storeBooks: Store<fromBooks.BooksState> = inject(Store<fromBooks.BooksState>);
  favouriteBooks$!: Observable<Book[]>;

  ngOnInit(): void {
    this.favouriteBooks$ = this.storeBooks.select(fromBooks.getFavouriteBooks);
  }

  /**
   * Remove book from list of favourite books
   * @param book Book
   */
  removeFromFavourites(book: Book): void {
    this.storeBooks.dispatch(Books.removeFavouriteBook({payload: book}));
  }
}
