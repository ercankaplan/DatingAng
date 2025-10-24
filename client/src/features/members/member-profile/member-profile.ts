import { Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Member } from '../../../types/member';
import { DatePipe } from '@angular/common';

//Date parser

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit {

 
  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe(
      data => {
        this.member.set(data['member']);
      }
    );
  }

}
