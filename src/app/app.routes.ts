import { Routes } from '@angular/router';
import { ListComponent } from './components/container-component/list-component/list-component';
import { FavouritesComponent } from './components/container-component/favourites-component/favourites-component';
import { DetailComponent } from './components/container-component/detail-component/detail-component';
import { provideState } from '@ngrx/store';
import { booksReducer } from './reducers/books.reducer';
import { LoginComponent } from './components/login-component/login-component';
import { ContainerComponent } from './components/container-component/container-component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'content',
    providers: [provideState('books', booksReducer)],
    component: ContainerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        providers: [provideState('books', booksReducer)],
        component: ListComponent,
      },
      {
        path: 'list/detail/:isbn',
        providers: [provideState('books', booksReducer)],
        component: DetailComponent,
      },
      {
        path: 'favourites',
        providers: [provideState('books', booksReducer)],
        component: FavouritesComponent,
      },
    ],
  },
];
