import { Component, inject, signal, type OnInit } from '@angular/core';
import { MessageService } from '../../core/services/message-service';
import { PaginatedResult, PaginationParams } from '../../types/paginatedResult';
import { Message } from '../../types/message';
import { PaginatorComponent } from '../../shared/paginator/paginator';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrl: './messages.css',
  imports: [PaginatorComponent,DatePipe,RouterLink /* ...other imports... */]
})
export class Messages implements OnInit {
  private messagesService = inject(MessageService);
  protected container = 'Outbox';
  protected fetchParamContainer = 'Outbox';
  protected pageNumber = 1;
  protected pageSize = 10;

  paginatedResult = signal<PaginatedResult<Message> | null>(null);

  tabs = [
    { label: 'Inbox', value: 'Inbox' },
    { label: 'Outbox', value: 'Outbox' }
  ];

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    this.messagesService.getMessages(this.container, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        console.log('Messages loaded successfully:', response);
        this.paginatedResult.set(response);
        this.fetchParamContainer = this.container; // Update fetchParamContainer after successful load
      },
      error: (error) => {
        console.error('Error loading messages:', error);
      }
    });
  }

  deleteMessage(event: Event, id: string) {
    event.stopPropagation();
    this.messagesService.deleteMessage(id).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (error) => {
        console.error('Error deleting message:', error);
      }
    });

  }

  get isInbox() {
    return this.fetchParamContainer === 'Inbox';
  }

  setContainer(container: string) {
    this.container = container;
    this.pageNumber = 1; // Reset to first page when changing container
    this.loadMessages();
  }

  onPageChange(event: PaginationParams) {
    this.pageNumber = event.pageNumber;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }

}
