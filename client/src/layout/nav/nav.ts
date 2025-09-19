import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds:any={};
  //protected isLoggedIn = signal(false);

  login() {

    console.log(this.creds);

    this.accountService.login(this.creds).subscribe({
     next: response=> {
      console.log(response);
      //this.isLoggedIn.set(true);
      this.creds={};
     },
     error: error=> alert(error.message)
    });
    
  }

  logout(){
    //this.isLoggedIn.set(false);
    this.accountService.logout();
    this.creds={};
  }
  
}
