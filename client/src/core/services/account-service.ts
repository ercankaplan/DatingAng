import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);

  CurrentUser = signal<User | null>(null);

  baseUrl = 'https://localhost:5001/api/';

  login(creds: LoginCreds) {
    //RxJS operators can be used here pipe(map(),catchError()...)
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
           this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    this.CurrentUser.set(null);
    localStorage.removeItem('user');
  }

  register(creds: RegisterCreds) {

    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.CurrentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
