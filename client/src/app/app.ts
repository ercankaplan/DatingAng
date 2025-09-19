import { HttpClient } from '@angular/common/http';
import { Component, signal, type Inject, inject, type OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import type { User } from '../types/user';


@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);

  protected readonly title = 'Dating App' //signal('Dating Angular App');

  protected members = signal<User[]>([]);
  //protected members: any;
/*
  ngOnInit_old(): void {
    this.http.get<User>('https://localhost:5001/api/members').subscribe({
      next: response => this.members.set(response), //console.log(response),
      error: error => console.log(error),
      complete: () => console.log('completed http request')
    });
  }
*/
  /*constructor(private http: HttpClient) {
    http.get('https://localhost:5001/api/users').subscribe({
      next: users => console.log(users),
      error: err => console.log(err)
    }); 
  }*/

  async ngOnInit() {
    this.members.set(await this.membersAsync());
    this.setCurrentUser();
  }
  setCurrentUser() {

    const userString = localStorage.getItem('user');

    if (!userString)
      return;

    const user = JSON.parse(userString);
    this.accountService.CurrentUser.set(user);
    console.log('set current user from local storage');



  }

  async membersAsync() {
    try {
      return await lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));//.toPromise();

    } catch (error) {
      console.log(error);
      return [];
    }
  }

}

