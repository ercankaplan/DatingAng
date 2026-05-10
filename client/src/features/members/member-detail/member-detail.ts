import { Component, computed, inject, signal, type OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import type { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detail',
  imports: [RouterLink,RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
   protected memberService = inject(MemberService);
   private accountService = inject(AccountService);
   private activatedRoute = inject(ActivatedRoute);
   private router = inject(Router); 
   //protected member$? : Observable<Member>;
   //protected member = signal<Member | undefined>(undefined);
   protected title = signal<string | undefined>('Profile'); 

   protected isCurrentUser = computed( () => {
      const currentUserId = this.accountService.CurrentUser()?.id;
      return currentUserId === this.activatedRoute.snapshot.paramMap.get('id');
   });

   ngOnInit(): void {
     //this.member$ = this.getMember();
     //this.activatedRoute.data.subscribe( {
       // next: data => this.member.set(data['member']),
     //});
     
     this.title.set(this.activatedRoute.firstChild?.snapshot?.title || 'Profile');

     this.router.events.pipe(
       filter(event => event instanceof NavigationEnd)
     ).subscribe( {
        next: () => {
           const childTitle = this.activatedRoute.firstChild?.snapshot?.title;
           this.title.set(childTitle || 'Profile');
        }
     });
   }
   
   /* private getMember() {
     const id = this.activatedRoute.snapshot.params['id'];

     if (!id) return;
     return this.memberService.getMemberById(id);
   } */
}
