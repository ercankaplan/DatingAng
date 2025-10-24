import { Component, inject, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {

  protected accountService = inject(AccountService);
  protected toastService = inject(ToastService);
  protected creds:any={};
  private router = inject(Router);
  protected selectedTheme =  signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes
  //protected isLoggedIn = signal(false);

    ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme()); 
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) {
      elem.blur();
    }
  }

  login() {

    //console.log(this.creds);

    this.accountService.login(this.creds).subscribe({
     next: ()=> {
      //console.log(response);
      this.toastService.success('Logged in successfully');
      this.router.navigateByUrl('/members');
      //this.isLoggedIn.set(true);
      this.creds={};
     },

     error: error=> { this.toastService.error(error.error); 
console.log(error);

     },
    });
    
  }

  logout(){
    //this.isLoggedIn.set(false);
    this.accountService.logout();
    this.creds={};
    this.router.navigateByUrl('/');
  }
  
}
