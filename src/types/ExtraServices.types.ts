export interface ExtraServicePaginatedDataType {
  id: string;
  name: string;
  price: number;
  isFree: boolean;
}

export interface ExtraServicePaginatedType {
  data: ExtraServicePaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateExtraServiceType {
  name: string;
  price: number;
  isFree: boolean;
}
