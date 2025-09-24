export enum ReduxActiontypes {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  CLEAR = "CLEAR",
  FAILED = "FAILED",
}

export interface ReduxActionReturnType<T> {
  type: ReduxActiontypes;
  payload?: T;
  error?: string;
}

export enum CommonAction {
  EDIT = "edit",
  DELETE = "delete",
  DOWNLOAD = "download",
  VIEW = "view",
  ADD = "add",
}

export enum PaymentStatus {
  Pending = "Pending",
  Completed = "Completed",
  Due = "Due",
}

export enum PurchaseOrderStatus {
  Received = "Received",
  Cancel = "Cancel",
  Draft = "Draft",
  Comfirm = "Comfirm",
}

export type SelectOption = {
  value: string;
  label: string;
};

export type DownloadRange = {
  supplier: string;
  fromDate: string;
  toDate: string;
};

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  searchKey: string;
}

export interface PaginationParamsForTradeSummery {
  pageNumber: number;
  pageSize: number;
  startDate: string;
  customerId: string;
}

export interface PaginationParamsForInvoice {
  pageNumber: number;
  pageSize: number;
  customerId: string;
  // date: string;
  // paymentStatus: string;
  // paymentMethod: string;
  // minAmount: number;
  // maxAmount: number;
}

export interface ImageUrlType {
  files: {
    fileName: string;
    url: string;
  }[];
}
