import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../../models/main-models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MainService } from '../../../services/main-service';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as fromBooks from '../../../reducers/books.reducer';
import * as Books from '../../../reducers/books.reducer.actions';
import * as UI from '../../../reducers/ui.reducer.actions';

@Component({
  selector: 'app-list-component',
  imports: [ReactiveFormsModule, DatePipe, RouterOutlet, AsyncPipe],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
})
export class ListComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    searchText: new FormControl(''),
  });
  private mainService = inject(MainService);
  private router: Router = inject(Router);
  private store: Store<fromRoot.State> = inject(Store<fromRoot.State>);
  private storeBooks: Store<fromBooks.BooksState> = inject(
    Store<fromBooks.BooksState>
  );
  isloading$!: Observable<boolean>;
  filteredBooks$!: Observable<Book[]>;

  ngOnInit(): void {
    this.mainService.getBooks();
    this.isloading$ = this.store.select(fromRoot.getIsLoading);
    this.filteredBooks$ = this.storeBooks.select(fromBooks.getFilteredBooks);
  }

  /**
   * Get list of books based on search criteria
   */
  onSearch() {
    const search = this.searchForm.controls.searchText?.value;
    this.store.dispatch(UI.startLoading());
    this.storeBooks.dispatch(Books.setSearchCriteria({ payload: search }));
    this.store.dispatch(UI.stopLoading());
  }

  /**
   * Navigate to detail page for selected book
   * @param book Book
   */
  onShowDetail(book: Book): void {
    this.storeBooks.dispatch(Books.setBookDetail({ payload: book }));
    this.router.navigate(['content', 'list', 'detail', book?.isbn]);
  }
}
