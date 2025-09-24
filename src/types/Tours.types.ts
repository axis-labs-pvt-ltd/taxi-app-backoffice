export interface ToursDataType {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  location: string;
  price: number;
  rating: number;
  days: number;
  nights: number;
  images?: string[];
}

export interface ToursPaginatedType {
  data: ToursDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
