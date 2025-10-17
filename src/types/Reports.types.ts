export interface ProftReportSummeryType {
  totalSales: number;
  totalCost: number;
  totalProfit: number;
}

export interface ProftReportDatatype {
  type: string;
  inquiryId: string;
  customerName: string;
  phone: string;
  tourDate: string;
  finalPrice: number;
  totalCost: number;
  profit: number;
}

export interface ProfitReportType {
  reports: ProftReportDatatype[];
  summary: ProftReportSummeryType;
}
