import { Component, HostListener, inject, signal, ViewChild, type OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

//Date parser

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  private accountservice = inject(AccountService);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);

  protected editableMember: EditableMember = {
    displayName: '',
    dateOfBirth: '',
    city: '',
    country: '',
    gender: '',
    description: ''
  };




  ngOnInit(): void {
   
    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      dateOfBirth: this.memberService.member()?.dateOfBirth || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
      gender: this.memberService.member()?.gender || '',
      description: this.memberService.member()?.description || ''
    }


  }
  ngOnDestroy(): void {
    if (this.memberService.editProfileMode()) {
      this.memberService.editProfileMode.set(false);
    }
  }
  updateProfile() {
    if (!this.memberService.member()) return;

    const updatedMember = {
      ...this.memberService.member(),
      ...this.editableMember
    }

    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
      
        console.log('Updated Member:', updatedMember);
        this.toast.success('Profile updated successfully!');
        this.memberService.editProfileMode.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(this.editableMember);

        const currentUser = this.accountservice.CurrentUser();
        if(currentUser && currentUser.displayName !== updatedMember.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountservice.setCurrentUser(currentUser);
        }
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.toast.error('Failed to update profile. Please try again.');
      }
    });



  }

}
