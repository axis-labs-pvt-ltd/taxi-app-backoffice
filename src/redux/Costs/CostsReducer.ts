import { CostsType } from "../../types/CostCategory.types";
import { ReduxState, ReduxStatus } from "../../types/Redux.types";

export const ADD_COSTS_REQUEST = "ADD_COSTS_REQUEST";
export const ADD_COSTS_SUCCESS = "ADD_COSTS_SUCCESS";
export const ADD_COSTS_FAILURE = "ADD_COSTS_FAILURE";
export const RESET_ADD_COSTS_SUCCESS = "RESET_ADD_COSTS_SUCCESS";
export const FETCH_COSTS_BY_INQUIRY_ID_REQUEST =
  "FETCH_COSTS_BY_INQUIRY_ID_REQUEST";
export const FETCH_COSTS_BY_INQUIRY_ID_SUCCESS =
  "FETCH_COSTS_BY_INQUIRY_ID_SUCCESS";
export const FETCH_COSTS_BY_INQUIRY_ID_FAILURE =
  "FETCH_COSTS_BY_INQUIRY_ID_FAILURE";

interface CostState {
  loading: boolean;
  addCostsSuccess: ReduxStatus;
  costByInquiryId: ReduxState<CostsType | null>;
}

const initialState: CostState = {
  loading: false,
  addCostsSuccess: { status: false, loading: false, error: null },
  costByInquiryId: { data: null, loading: false, error: null },
};

interface AddCostsRequestAction {
  type: typeof ADD_COSTS_REQUEST;
}

interface AddCostsSuccessAction {
  type: typeof ADD_COSTS_SUCCESS;
}

interface AddCostsFailureAction {
  type: typeof ADD_COSTS_FAILURE;
  payload: string;
}

interface RestAddCostsSuccessAction {
  type: typeof RESET_ADD_COSTS_SUCCESS;
}

interface FetchCostsByInquiryIdRequestAction {
  type: typeof FETCH_COSTS_BY_INQUIRY_ID_REQUEST;
}

interface FetchCostsByInquiryIdSuccessAction {
  type: typeof FETCH_COSTS_BY_INQUIRY_ID_SUCCESS;
  payload: CostsType;
}

interface FetchCostsByInquiryIdFailureAction {
  type: typeof FETCH_COSTS_BY_INQUIRY_ID_FAILURE;
  payload: string;
}

export type CostsActionTypes =
  | AddCostsRequestAction
  | AddCostsSuccessAction
  | AddCostsFailureAction
  | RestAddCostsSuccessAction
  | FetchCostsByInquiryIdRequestAction
  | FetchCostsByInquiryIdSuccessAction
  | FetchCostsByInquiryIdFailureAction;

const costsReducer = (
  state = initialState,
  action: CostsActionTypes
): CostState => {
  switch (action.type) {
    case ADD_COSTS_REQUEST:
      return {
        ...state,
        loading: true,
        addCostsSuccess: { status: false, error: null, loading: true },
      };
    case ADD_COSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        addCostsSuccess: { status: true, error: null, loading: false },
      };
    case ADD_COSTS_FAILURE:
      return {
        ...state,
        loading: false,
        addCostsSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_COSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        addCostsSuccess: { status: false, error: null, loading: false },
      };

    case FETCH_COSTS_BY_INQUIRY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        costByInquiryId: { data: null, error: null, loading: true },
      };
    case FETCH_COSTS_BY_INQUIRY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        costByInquiryId: { data: action.payload, error: null, loading: false },
      };
    case FETCH_COSTS_BY_INQUIRY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        costByInquiryId: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default costsReducer;
