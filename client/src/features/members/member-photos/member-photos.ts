import { Component, inject, type OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import type { Photo } from '../../../types/member';
import type { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos {


  private membersService = inject(MemberService);
  private route = inject(ActivatedRoute);

  protected photos$? : Observable<Photo[]>;


  constructor() {

    const memberId = this.route.parent?.snapshot.paramMap.get('id');

    if (memberId) {
      this.photos$ = this.membersService.getMemberPhotos(memberId);
    }


  }

  getPhotoMocks() {
    return Array.from({ length: 19 }, (_, index) => ({
      id: `photo-${index + 1}`,
      url: `/user.png`,
      isMain: false,
    }));
  }


}
