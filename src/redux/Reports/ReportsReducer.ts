import { ReduxState } from "../../types/Redux.types";
import { ProfitReportType } from "../../types/Reports.types";

export const FETCH_PROFIT_COST_REPORT_REQUEST =
  "FETCH_PROFIT_COST_REPORT_REQUEST";
export const FETCH_PROFIT_COST_REPORT_SUCCESS =
  "FETCH_PROFIT_COST_REPORT_SUCCESS";
export const FETCH_PROFIT_COST_REPORT_FAILURE =
  "FETCH_PROFIT_COST_REPORT_FAILURE";
export const CLEAR_PROFIT_REPORT = "CLEAR_PROFIT_REPORT";

interface ReportState {
  loading: boolean;
  profitReport: ReduxState<ProfitReportType | null>;
}

const initialState: ReportState = {
  loading: false,
  profitReport: { data: null, loading: false, error: null },
};

interface FetchProfitCostReportRequestAction {
  type: typeof FETCH_PROFIT_COST_REPORT_REQUEST;
}

interface FetchProfitCostReportSuccessAction {
  type: typeof FETCH_PROFIT_COST_REPORT_SUCCESS;
  payload: ProfitReportType;
}

interface FetchProfitCostReportFailureAction {
  type: typeof FETCH_PROFIT_COST_REPORT_FAILURE;
  payload: string;
}

interface ClearProfitReportAction {
  type: typeof CLEAR_PROFIT_REPORT;
}

export type ReportsActionTypes =
  | FetchProfitCostReportRequestAction
  | FetchProfitCostReportSuccessAction
  | FetchProfitCostReportFailureAction
  | ClearProfitReportAction;

const reportsReducer = (
  state = initialState,
  action: ReportsActionTypes
): ReportState => {
  switch (action.type) {
    case FETCH_PROFIT_COST_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        profitReport: { data: null, error: null, loading: true },
      };
    case FETCH_PROFIT_COST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        profitReport: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_PROFIT_COST_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        profitReport: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case CLEAR_PROFIT_REPORT:
      return {
        ...state,
        loading: false,
        profitReport: { data: null, error: null, loading: false },
      };

    default:
      return state;
  }
};

export default reportsReducer;
