import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SignUp, Login } from '../models/main-models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { USERS_API_URL, SIGN_UP_API_URL } from '../constants/main-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  userLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoginError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  loggedUser$: BehaviorSubject<SignUp> = new BehaviorSubject<SignUp>({
    name: '',
    username: '',
    password: '',
  });
  destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Sign up new user
   * @param signUp SignUp
   */
  signUp(signUp: SignUp) {
    this.httpClient
      .post(SIGN_UP_API_URL, JSON.stringify(signUp))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loggedUser$.next(signUp);
          this.userLoggedIn$.next(true);
          this.router.navigate(['/content']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * User login
   * @param login Login
   */
  login(login: Login) {
    this.httpClient
      .get<any>(USERS_API_URL)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const existingUser = this.getExistingUser(res, login);
          if (existingUser) {
            this.loggedUser$.next(existingUser);
            this.userLoginError$.next(false);
            this.userLoggedIn$.next(true);
            this.router.navigate(['/content']);
          } else {
            this.userLoginError$.next(true);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * User logout
   */
  logout(): void {
    this.userLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get existing user
   * @param users SignUp[]
   * @param login Login
   * @returns {SignUp}
   */
  getExistingUser(users: SignUp[], login: Login): SignUp {
    let existingUser: SignUp = {
      name: '',
      username: '',
      password: '',
    };
    if (users && users.length > 0) {
      existingUser = users.find((x) => x.username === login.username) as SignUp;
    }

    return existingUser;
  }
}
