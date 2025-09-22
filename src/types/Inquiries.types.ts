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
  id?: string;
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
  finalPrice: number;
  totalDistance: number;
  actualTotalDistance: number;
  vehicleModelId: VehicleModelIdType;
  vehicleAssigned: {
    vehicleId: string;
    plateNumber: string;
  };
  startMeter: number;
  endMeter: number;
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

export interface RecentInquiriesType {
  fullName: string;
  tourDate: string;
}

export interface MeterValuesType {
  startMeter: number;
  endMeter: number;
}
