export interface VehicleModelIdType {
  id: string;
  type: string;
  modelName: string;
  brand: string;
}

export interface DropPointsType {
  id: number;
  lat: number;
  lng: number;
  name: string;
  from?: string;
  to?: string;
  distance?: string;
  duration?: string;
  index: number;
}

export interface InquiryPaginatedDataType {
  id?: string
  customerId?: string;
  pickup: {
    lat: number;
    lng: number;
    name: string;
  } | null;
  drop: {
    lat: number;
    lng: number;
    name: string;
  } | null;
  phone: string;
  fullName: string;
  email: string;
  tourDate: string;
  estimatedPrice: number;
  totalDistance: number;
  vehicleModelId: VehicleModelIdType;
  status: string;
  dropPoints: DropPointsType[];
}

export interface InquiryPaginatedType {
  data: InquiryPaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
