export interface VehicleModelsEssentialType {
  id: string;
  modelName: string;
  brand: string;
}

export interface VehicleModelRateType {
  id: string;
  name: string;
}

export interface VehicleModelOptionsType {
  passengerCount: number;
  luggageCapacity: string;
  transmission: string;
  airCondition: boolean;
}

export interface VehicleModelsPaginatedDataType {
  id: string;
  options: VehicleModelOptionsType;
  modelName: string;
  type: string;
  brand: string;
  rateCardId: VehicleModelRateType;
}

export interface VehicleModelsPaginatedType {
  data: VehicleModelsPaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateVehicleModelType {
  id?: string;
  options: VehicleModelOptionsType;
  modelName: string;
  type: string;
  brand: string;
  rateCardId: string;
}
