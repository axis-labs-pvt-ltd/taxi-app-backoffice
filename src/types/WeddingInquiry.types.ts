import { ExtraServicesType } from "./Inquiries.types";

export interface VehicleModelIdType {
  id: string;
  type: string;
  modelName: string;
  brand: string;
}

export interface WeddingInquiryPaginatedDataType {
  id?: string;
  bookingDate: string;
  phone: string;
  fullName: string;
  email: string;
  estimatedPrice: number;
  finalPrice: number;
  totalDistance: number;
  vehicleModelId: VehicleModelIdType;
  vehicleAssigned: {
    vehicleId: string;
    plateNumber: string;
  };
  startMeter: number;
  endMeter: number;
  status: string;
  extraServices: ExtraServicesType[];
}

export interface WeddingInquiryPaginatedType {
  data: WeddingInquiryPaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
