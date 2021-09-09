import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppError } from '../errors/app-error';
import { UserExitsError } from '../errors/user-exits-error';
import { WrongCredentialError } from '../errors/wrong-crendential-error';
import { User } from '../models/user.model';
interface EmailPassword {
  email: string;
  password: string;
}

interface SignUpUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  firstName: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

interface ResetPassword {
  currentPassword: string,
  newPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = `${environment.baseUrl}api/account/`;
  readonly JWT_TOKEN = 'JWT_TOKEN';
  readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // Set to Undefined to check in the Guard when refresh the page
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.getUser().subscribe(user => { this.user$.next(user as User); });
  }

  getUser() {
    return this.http.get(this.BASE_URL+ 'getUser').pipe(
      catchError((error: Response) => {
      return of(null);
    }), map(user => {
      return user;
    }));
  }

  async signup(emailPassword: SignUpUser) {
    await this.http.post(this.BASE_URL + 'signup', emailPassword).
      pipe(take(1),
        catchError((error: Response) => {
          if(error.status === 400) {
            return throwError(new UserExitsError(error));
          }
          return throwError(new AppError(error));
        })).toPromise();
  }

  async login(emailPassword: EmailPassword) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home';

    await this.http.post(this.BASE_URL + 'signin', emailPassword).
      pipe(take(1), map((token: LoginResponse) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
        this.user$.next({ id: token.id, firstName: token.firstName, email: token.email, role: token.role });
        this.router.navigate([returnUrl]);
      }),
        catchError((error: Response) => {
          console.log(error);
          if (error.status === 401) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        })).toPromise();
  }

  resetPassword(resetPassword: ResetPassword ){
    console.log("Resert service was called");

    // return this.http.put(this.BASE_URL + 'resetPassword', resetPassword).
    //   pipe(take(1), map((token: LoginResponse) => {
    //     // localStorage.setItem(this.JWT_TOKEN, token.accessToken);
    //     // localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
    //     // this.user$.next({ id: token.id, email: token.email, role: token.role });
    //   }),
    //     catchError((error: Response) => {
    //       if (error.status === 403) {
    //         return throwError(new WrongCredentialError());
    //       }
    //       return throwError(new AppError(error));
    //     }));
  }

  async forgotPassword( email: string){
    await this.http.put(this.BASE_URL + 'forgotPassword', {email}).
      pipe(take(1), map((resp: any) => {
        return resp;
      }),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        })).toPromise();
  }

  async forgotPasswordToken(email: string, password: string, forgotPasswordToken: string) {
    await this.http.post(this.BASE_URL + 'forgotPasswordToken', {email, password, forgotPasswordToken}).
      pipe(take(1), map((resp: any) => {
        return resp;
      }),
        catchError((error: Response) => {
          if (error.status === 403 || error.status === 401) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        })).toPromise();
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
    
    return this.http.post(this.BASE_URL + 'refresh-token', { refreshToken }).
      pipe(take(1), tap((token: { accessToken: string }) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
      }));
  }

  get getStoredToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  async logOut() {
    // const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
    // this.http.delete(this.BASE_URL + refreshToken).pipe(
    //   catchError((error: Response) => {
    //     return throwError(new AppError(error));
    //   }))
    // .subscribe();

    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.user$.next(null);
    this.router.navigate(['home']);
  }
}
