import { Component, inject, type OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import type { Member } from '../../../types/member';

@Component({
  selector: 'app-member-detail',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
   private memberService = inject(MemberService);
   private activatedRoute = inject(ActivatedRoute);
   protected member$? : Observable<Member>;

   ngOnInit(): void {
     this.member$ = this.getMember();
   }

   private getMember() {
     const id = this.activatedRoute.snapshot.params['id'];

     if (!id) return;
     return this.memberService.getMemberById(id);
   }
}
