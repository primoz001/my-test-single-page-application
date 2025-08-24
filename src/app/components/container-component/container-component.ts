import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../../services/main-service';
import { takeUntil, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromBooks from '../../reducers/books.reducer';
import * as Books from '../../reducers/books.reducer.actions';
import * as UI from '../../reducers/ui.reducer.actions';
import { AuthService } from '../../services/auth-service';
import { SignUp } from '../../models/main-models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-container-component',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './container-component.html',
  styleUrl: './container-component.css',
})
export class ContainerComponent implements OnInit, OnDestroy {
  private mainService = inject(MainService);
  private store: Store<fromRoot.State> = inject(Store<fromRoot.State>);
  private storeBooks: Store<fromBooks.BooksState> = inject(
    Store<fromBooks.BooksState>
  );
  private authService: AuthService = inject(AuthService);
  destroy$: Subject<boolean> = new Subject<boolean>();
  loggedUser$: BehaviorSubject<SignUp> = new BehaviorSubject<SignUp>({
    name: '',
    username: '',
    password: '',
  });

  ngOnInit(): void {
    this.store.dispatch(UI.startLoading());
    this.mainService
      .getBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (books) => {
          this.storeBooks.dispatch(Books.setAvailableBooks({ payload: books }));
          this.store.dispatch(UI.stopLoading());
        },
        error: (err) => {
          this.store.dispatch(UI.stopLoading());
          throw err;
        },
      });
    this.loggedUser$ = this.authService.loggedUser$;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Logout user
   */
  logout() {
    this.authService.logout();
  }
}
