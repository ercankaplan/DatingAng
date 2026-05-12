export type PaginationMetadata = {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type PaginationParams = Pick<PaginationMetadata, 'pageNumber' | 'pageSize'>;

export type PaginatedResult<T> = PaginationMetadata & {
  items: T[];
}
