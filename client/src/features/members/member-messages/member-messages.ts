import { Component, ElementRef, effect, inject, signal, ViewChild, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../core/services/message-service';
import type { Message } from '../../../types/message';
import { AccountService } from '../../../core/services/account-service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-member-messages',
  imports: [TimeAgoPipe, DatePipe, FormsModule /* ...other imports... */],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css'
})
export class MemberMessages implements OnInit {

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef<HTMLDivElement>;

  private messagesService = inject(MessageService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);

  private currentUserId = signal<string | null>(null);
  protected memberId: string | null = null;
  messages = signal<Message[]>([]);
  protected messageContent = '';

  constructor() {
    effect(() => {
      const length = this.messages().length;
      if (length === 0) return;
      this.scrollToBottom();
    });
  }



  ngOnInit(): void {

    this.currentUserId.set(this.accountService.CurrentUser()?.id || null);

    this.route.parent?.paramMap.subscribe(params => {
      this.memberId = params.get('id');
      this.loadMessageThread();
    });
  }

  loadMessageThread() {
    if (!this.memberId)
      return;
    this.messagesService.getMessageThread(this.memberId).subscribe({
      next: (response) => {

        this.messages.set(response.map(msg => ({
          ...msg,
          isCurrentUserSender: String(msg.senderId) === this.currentUserId()
        })))



      },
      error: (error) => {
        console.error('Error loading message thread:', error);
      }
    });

  }



  isCurrentUserMessage(senderId: number) {
    return String(senderId) === this.currentUserId();
  }

  sendMessage() {
    if (!this.memberId) return;

    this.messagesService.sendMessage(this.memberId, this.messageContent).subscribe({
      next: (newmessage) => {
        this.messages.update(messages => [...messages, { ...newmessage, isCurrentUserSender: true }]);
        this.messageContent = '';
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  }


  scrollToBottom() {

    if(!this.scrollAnchor) return;
    setTimeout(() => {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }




}
