import {
  MonthlyIncomeType,
  totalCostType,
  totalIncomeType,
} from "../../types/Dashboard.types";
import { ReduxState } from "../../types/Redux.types";

export const FETCH_TOTAL_INCOME_REQUEST = "FETCH_TOTAL_INCOME_REQUEST";
export const FETCH_TOTAL_INCOME_SUCCESS = "FETCH_TOTAL_INCOME_SUCCESS";
export const FETCH_TOTAL_INCOME_FAILURE = "FETCH_TOTAL_INCOME_FAILURE";
export const FETCH_MONTHLY_INCOME_REQUEST = "FETCH_MONTHLY_INCOME_REQUEST";
export const FETCH_MONTHLY_INCOME_SUCCESS = "FETCH_MONTHLY_INCOME_SUCCESS";
export const FETCH_MONTHLY_INCOME_FAILURE = "FETCH_MONTHLY_INCOME_FAILURE";
export const FETCH_TOTAL_COST_REQUEST = "FETCH_TOTAL_COST_REQUEST";
export const FETCH_TOTAL_COST_SUCCESS = "FETCH_TOTAL_COST_SUCCESS";
export const FETCH_TOTAL_COST_FAILURE = "FETCH_TOTAL_COST_FAILURE";

interface DashbaordState {
  loading: boolean;
  totalIncome: ReduxState<totalIncomeType | null>;
  monthlyIncome: ReduxState<MonthlyIncomeType[] | null>;
  totalCost: ReduxState<totalCostType | null>;
}

const initialState: DashbaordState = {
  loading: false,
  totalIncome: { data: null, loading: false, error: null },
  monthlyIncome: { data: null, loading: false, error: null },
  totalCost: { data: null, loading: false, error: null },
};

interface FetchTotalIncomeRequestAction {
  type: typeof FETCH_TOTAL_INCOME_REQUEST;
}

interface FetchTotalIncomeSuccessAction {
  type: typeof FETCH_TOTAL_INCOME_SUCCESS;
  payload: totalIncomeType;
}

interface FetchTotalIncomeFailureAction {
  type: typeof FETCH_TOTAL_INCOME_FAILURE;
  payload: string;
}

interface FetchMonthlyIncomeRequestAction {
  type: typeof FETCH_MONTHLY_INCOME_REQUEST;
}

interface FetchMonthlyIncomeSuccessAction {
  type: typeof FETCH_MONTHLY_INCOME_SUCCESS;
  payload: MonthlyIncomeType[];
}

interface FetchMonthlyIncomeFailureAction {
  type: typeof FETCH_MONTHLY_INCOME_FAILURE;
  payload: string;
}

interface FetchTotalCostRequestAction {
  type: typeof FETCH_TOTAL_COST_REQUEST;
}

interface FetchTotalCostSuccessAction {
  type: typeof FETCH_TOTAL_COST_SUCCESS;
  payload: totalCostType;
}

interface FetchTotalCostFailureAction {
  type: typeof FETCH_TOTAL_COST_FAILURE;
  payload: string;
}

export type DashboardActionTypes =
  | FetchTotalIncomeRequestAction
  | FetchTotalIncomeSuccessAction
  | FetchTotalIncomeFailureAction
  | FetchMonthlyIncomeRequestAction
  | FetchMonthlyIncomeSuccessAction
  | FetchMonthlyIncomeFailureAction
  | FetchTotalCostRequestAction
  | FetchTotalCostSuccessAction
  | FetchTotalCostFailureAction;

const dashboardReducer = (
  state = initialState,
  action: DashboardActionTypes
): DashbaordState => {
  switch (action.type) {
    case FETCH_TOTAL_INCOME_REQUEST:
      return {
        ...state,
        loading: true,
        totalIncome: { data: null, error: null, loading: true },
      };
    case FETCH_TOTAL_INCOME_SUCCESS:
      return {
        ...state,
        loading: false,
        totalIncome: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_TOTAL_INCOME_FAILURE:
      return {
        ...state,
        loading: false,
        totalIncome: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case FETCH_MONTHLY_INCOME_REQUEST:
      return {
        ...state,
        loading: true,
        monthlyIncome: { data: null, error: null, loading: true },
      };
    case FETCH_MONTHLY_INCOME_SUCCESS:
      return {
        ...state,
        loading: false,
        monthlyIncome: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_MONTHLY_INCOME_FAILURE:
      return {
        ...state,
        loading: false,
        monthlyIncome: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case FETCH_TOTAL_COST_REQUEST:
      return {
        ...state,
        loading: true,
        totalCost: { data: null, error: null, loading: true },
      };
    case FETCH_TOTAL_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        totalCost: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_TOTAL_COST_FAILURE:
      return {
        ...state,
        loading: false,
        totalCost: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default dashboardReducer;
