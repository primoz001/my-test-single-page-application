import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignUp, Login } from '../../models/main-models';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterOutlet, AsyncPipe],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnDestroy {
  private authService: AuthService = inject(AuthService);
  showLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$: Subject<boolean> = new Subject<boolean>();
  authError: string = '';
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  /**
   * Sign up new user
   */
  signUp(): void {
    if (this.signUpForm.valid) {
      const signUpFormValue: SignUp = this.signUpForm.value;
      this.authService.signUp(signUpFormValue);
    }
  }

  /**
   * User login
   */
  login() {
    if (this.loginForm.valid) {
      const loginFormValue: Login = this.loginForm.value;
      this.authService.login(loginFormValue);
      this.authService.userLoginError$
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (val: boolean) => {
            if (val) {
              this.authError = 'Username or password are incorrect';
            }
          },
          error: (err) => {
            console.log('Error at userLoginError$', err);
          },
        });
    }
  }

  /**
   * Open login form
   */
  openLogin() {
    this.showLogin$.next(true);
  }

  /**
   * Open sign up form
   */
  openSignUp() {
    this.showLogin$.next(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
