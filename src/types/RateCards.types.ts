export interface RateCardsType {
  id?: string;
  name: string;
  dailyRate: number;
  includedKmPerDay: number;
  extraKmRate: number;
  currency: string;
}

export interface RateCardPaginatedType {
  data: RateCardsType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
