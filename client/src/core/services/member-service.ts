import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import type { Member } from '../../types/member';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl ;
  

  getMembers(){

    return this.http.get<Member[]>(this.baseUrl + 'members');//, this.getHttpOptions()); jwtInterceptor will handle it
  }

  getMemberById(id: number){

    return this.http.get<Member>(this.baseUrl + 'members/' + id);//, this.getHttpOptions());
  }

  private getHttpOptions() {
    //const userString = localStorage.getItem('user');
    //if (!userString) return {};
    //const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.CurrentUser()?.token}`
      })
    };
  }
}
