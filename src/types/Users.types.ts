export interface ResetPasswordType {
  newPassword: string;
}

export interface UsersDataType {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  role: string;
}

export interface UsersPaginatedType {
  data: UsersDataType[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
