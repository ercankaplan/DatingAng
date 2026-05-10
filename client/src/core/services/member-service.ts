import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import type { EditableMember, Member, Photo } from '../../types/member';
import { AccountService } from './account-service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl ;
  editProfileMode = signal<boolean>(false);
  member = signal<Member | null>(null);

  getMembers(){

    return this.http.get<Member[]>(this.baseUrl + 'members');//, this.getHttpOptions()); jwtInterceptor will handle it
  }

  getMemberById(id: string){

    return this.http.get<Member>(this.baseUrl + 'members/' + id).pipe(
      tap(mData => this.member.set(mData))
    );//, this.getHttpOptions());
  }

  getMemberPhotos(memberId: string) {
    return this.http.get<Photo[]>(this.baseUrl+'members/'+ memberId+'/photos');//, this.getHttpOptions());
  }

  updateMember(editableMember: EditableMember) {
    return this.http.put(this.baseUrl + 'members', editableMember);
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
