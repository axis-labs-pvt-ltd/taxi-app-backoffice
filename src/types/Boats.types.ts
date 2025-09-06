export interface BoatsPaginatedDataType {
  id?: string;
  boatName: string;
  registrationNumber: string;
  type: "Multi-day Boat" | "FRP Boat";
  capacityKg?: number;
}

export interface BoatsPaginatedType {
  data: BoatsPaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateBoatType {
  id?: string;
  boatName: string;
  registrationNumber: string;
  type: "Multi-day Boat" | "FRP Boat";
  capacityKg?: string;
}

export interface BoatsForSelectionsType {
  boats: {
    id: string;
    boatName: string;
  }[];
}
