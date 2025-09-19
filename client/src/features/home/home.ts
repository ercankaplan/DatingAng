import { Component,Input, inject, signal } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { Register } from "../account/register/register";
import type { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  //@Input({required:true}) membersFromApp: User[] = []; 
  protected accountService = inject(AccountService);
  protected registerMode = signal(false);

   showRegister(value:boolean) {
    this.registerMode.set(value);
  }
}
