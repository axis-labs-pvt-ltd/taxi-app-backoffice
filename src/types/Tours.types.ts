export interface DropPointType {
  id: number;
  index: number;
  name?: string;
  from?: string;
  to?: string;
  distance?: string;
  duration?: string;
  lat: number;
  lng: number;
}

// Sub-schema for day-wise details
export interface DayType {
  dayNumber: string;
  title: string;
  description: string;
  image?: string;
  dropPoints: DropPointType[];
}

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
  itinerary: DayType[];
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
