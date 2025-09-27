import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);
  //Just make sure the service is created and current user is set from local storage if any
  init()
  {

     const userString = localStorage.getItem('user');

    if (!userString)
      return of(null);

    const user = JSON.parse(userString);
    this.accountService.CurrentUser.set(user);
    console.log('set current user from local storage');

    return of(null);
  }
}
