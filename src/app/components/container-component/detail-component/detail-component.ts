import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../models/main-models';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromBooks from '../../../reducers/books.reducer';
import * as Books from '../../../reducers/books.reducer.actions';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-component',
  imports: [DatePipe, ReactiveFormsModule, AsyncPipe],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.css',
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input({ required: true }) isbn!: string;
  private storeBooks: Store<fromBooks.BooksState> = inject(Store<fromBooks.BooksState>);
  inFavourites: FormControl<boolean> = new FormControl<boolean>(false, {nonNullable: true,});
  book$!: Observable<Book | null>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.book$ = this.storeBooks.select(fromBooks.getSelectedBookDetail);
    this.storeBooks.select(fromBooks.getFavouriteBooks).pipe(takeUntil(this.destroy$)).subscribe({
      next: ((books) => {
        this.inFavourites.setValue(books.find((x) => x.isbn === this.isbn) ? true : false);
      }),
      error: ((err) => {
        throw err;
      })
    });
  }

  /**
   * Add or remove book from list of favourite books
   */
  onAddRemoveFavourites(book: Book): void {
    const addToFavourites = this.inFavourites.value;
    if (addToFavourites) {
      this.storeBooks.dispatch(Books.addFavouriteBook({payload: book}));
    }
    else {
      this.storeBooks.dispatch(Books.removeFavouriteBook({payload: book}));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
