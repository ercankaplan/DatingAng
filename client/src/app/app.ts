import { HttpClient } from '@angular/common/http';
import { Component, signal, type Inject, inject, type OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
 
  private http = inject(HttpClient);

  protected readonly title = 'Dating App' //signal('Dating Angular App');

    protected members = signal<any>([]);
  //protected members: any;

   ngOnInit1(): void {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next:response => this.members.set(response), //console.log(response),
      error: error => console.log(error),
      complete: () => console.log('completed http request')
    });
  }

  /*constructor(private http: HttpClient) {
    http.get('https://localhost:5001/api/users').subscribe({
      next: users => console.log(users),
      error: err => console.log(err)
    }); 
  }*/

    async ngOnInit() {
    this.members.set(await this.membersAsync());
  }
    async membersAsync() {
      try {
        return await  lastValueFrom(this.http.get('https://localhost:5001/api/members'));//.toPromise();
  
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    }  
  
