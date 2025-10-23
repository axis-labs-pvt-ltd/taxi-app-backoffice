import { ExtraServicesType, InquiryCostType } from "./Inquiries.types";

export interface TourIdType {
  id: string;
  title: string;
  price: number;
}

export interface ModelIdType {
  modelName: string;
  type: string;
  brand: string;
  id: string;
}

export interface VehicleIdType {
  id: string;
  modelId: ModelIdType;
  plateNumber: string;
}

export interface vehicleAssignedType {
  vehicleId: VehicleIdType;
  plateNumber: string;
}

export interface TourInquiryDataType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tourId: TourIdType;
  bookingDate: string;
  travelDate: string;
  adults: number;
  children: number;
  infants: number;
  costId: InquiryCostType;
  discount: number;
  finalPrice: number | null;
  vehicleAssigned: vehicleAssignedType;
  status: string;
  extraServices: ExtraServicesType[];
  totalDistance: number;
  startMeter: number;
  endMeter: number;
}

export interface TourInquiryPaginatedType {
  data: TourInquiryDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
