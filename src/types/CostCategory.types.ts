export interface CostCategoriesType {
  id: string;
  name: string;
}

export interface AddCostsType {
  costs: {
    id?: string;
    costCategoryId: string;
    amount: number;
  }[];
}

export interface CostsType {
  id?: string;
  inquiryId: string;
  costs: {
    id?: string;
    costCategoryId: string;
    amount: number;
  }[];
}
