export interface DriverAddressType {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface DriverEmergencyContactType {
  name: string;
  phone: string;
  relationship: string;
}

export interface DriversPaginatedDataType {
  id: string;
  address: DriverAddressType;
  emergencyContact: DriverEmergencyContactType;
  fullName: string;
  type: string;
  mobileNo: string;
  drivingLicenseExpireDate: string;
  licenseImageUrl: string;
  status: string;
  email: string;
  dateOfBirth: string;
  assignedVehicle?: null;
  salary: number;
  joinDate: string;
  isLicenseExpired: false;
  age: number;
  employmentDuration: number;
}

export interface DriversPaginatedType {
  data: DriversPaginatedDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateDriveType {
  fullName: string;
  type: string;
  mobileNo: string;
  drivingLicenseExpireDate: string;
  // licenseImageUrl: string;
  status: string;
  email: string;
  dateOfBirth: string;
  salary?: number;
  joinDate?: string;
  address: DriverAddressType;
  emergencyContact?: DriverEmergencyContactType;
}
