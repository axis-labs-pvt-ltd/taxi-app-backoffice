export interface VehiclePaginatedDataType {
  type: string;
  plateNumber: string;
  brand: string;
  model: string;
  pricePerKm: number;
  capacity: number;
  status: string;
  id: string;
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
  type: string;
  plateNumber: string;
  brand: string;
  model: string;
  pricePerKm: string;
  capacity: string;
  status: "available" | "booked" | "not available";
}
