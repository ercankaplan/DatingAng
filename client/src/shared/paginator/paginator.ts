import {Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationParams } from '../../types/paginatedResult';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class PaginatorComponent {
  @Input() pageNumber = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<PaginationParams>();

  get canPrev(): boolean {
    return this.pageNumber > 1;
  }

  get canNext(): boolean {
    return this.pageNumber < this.totalPages;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages || 0 }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.pageNumber) return;
    this.pageChange.emit({ pageNumber: page, pageSize: this.pageSize });
  }

  prev(): void {
    this.changePage(this.pageNumber - 1);
  }

  next(): void {
    this.changePage(this.pageNumber + 1);
  }
}
