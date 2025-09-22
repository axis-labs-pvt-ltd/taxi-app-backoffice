import {
  MonthlyIncomeType,
  totalIncomeType,
} from "../../types/Dashboard.types";
import { ReduxState } from "../../types/Redux.types";

export const FETCH_TOTAL_INCOME_REQUEST = "FETCH_TOTAL_INCOME_REQUEST";
export const FETCH_TOTAL_INCOME_SUCCESS = "FETCH_TOTAL_INCOME_SUCCESS";
export const FETCH_TOTAL_INCOME_FAILURE = "FETCH_TOTAL_INCOME_FAILURE";
export const FETCH_MONTHLY_INCOME_REQUEST = "FETCH_MONTHLY_INCOME_REQUEST";
export const FETCH_MONTHLY_INCOME_SUCCESS = "FETCH_MONTHLY_INCOME_SUCCESS";
export const FETCH_MONTHLY_INCOME_FAILURE = "FETCH_MONTHLY_INCOME_FAILURE";

interface DashbaordState {
  loading: boolean;
  totalIncome: ReduxState<totalIncomeType | null>;
  monthlyIncome: ReduxState<MonthlyIncomeType[] | null>;
}

const initialState: DashbaordState = {
  loading: false,
  totalIncome: { data: null, loading: false, error: null },
  monthlyIncome: { data: null, loading: false, error: null },
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

export type DashboardActionTypes =
  | FetchTotalIncomeRequestAction
  | FetchTotalIncomeSuccessAction
  | FetchTotalIncomeFailureAction
  | FetchMonthlyIncomeRequestAction
  | FetchMonthlyIncomeSuccessAction
  | FetchMonthlyIncomeFailureAction;

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

    default:
      return state;
  }
};

export default dashboardReducer;
