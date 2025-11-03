export interface RateCardType {
  id: string;
  name: string;
}

export interface VehiclePaginatedModelType {
  id: string;
  modelName: string;
  brand: string;
  rateCard: RateCardType;
}

export interface VehiclePaginatedDataType {
  id: string;
  plateNumber: string;
  model: VehiclePaginatedModelType;
  year: string;
  ownership: "Own" | "Third-Party";
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  status: string;
}

export interface VehiclePaginatedType {
  data: VehiclePaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateVehicleType {
  modelId: string;
  plateNumber: string;
  year: string;
  ownership: "Own" | "Third-Party";
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  status: "available" | "booked" | "not available";
}

export interface VehiclesByModelAndDateType {
  id: string;
  plateNumber: string;
}

export interface AssignVehicleType {
  vehicleId: string;
}

export interface updateActualDistanceType {
  actualTotalDistance: number;
}

export interface UpdateInquiryStatusType {
  status: string;
}

export interface UpdateMeterValuesType {
  startMeter: number;
  endMeter?: number | null;
}
