import { ReduxState } from "../../types/Redux.types";
import { WeddingInquiryPaginatedType } from "../../types/WeddingInquiry.types";

export const FETCH_WEDDING_INQUIRES_PAGINATED_REQUEST =
  "FETCH_WEDDING_INQUIRES_PAGINATED_REQUEST";
export const FETCH_WEDDING_INQUIRES_PAGINATED_SUCCESS =
  "FETCH_WEDDING_INQUIRES_PAGINATED_SUCCESS";
export const FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE =
  "FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE";

interface WeddingInquiryState {
  loading: boolean;
  weddingInquiriesPaginated: ReduxState<WeddingInquiryPaginatedType | null>;
}

const initialState: WeddingInquiryState = {
  loading: false,
  weddingInquiriesPaginated: { data: null, loading: false, error: null },
};

interface FetchWeddingInquiriesPaginatedRequestAction {
  type: typeof FETCH_WEDDING_INQUIRES_PAGINATED_REQUEST;
}

interface FetchWeddingInquiriesPaginatedSuccessAction {
  type: typeof FETCH_WEDDING_INQUIRES_PAGINATED_SUCCESS;
  payload: WeddingInquiryPaginatedType;
}

interface FetchWeddingInquiriesPaginatedFailureAction {
  type: typeof FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE;
  payload: string;
}

export type WeddingInquiriesActionTypes =
  | FetchWeddingInquiriesPaginatedRequestAction
  | FetchWeddingInquiriesPaginatedSuccessAction
  | FetchWeddingInquiriesPaginatedFailureAction;

const weddingInquiriesReducer = (
  state = initialState,
  action: WeddingInquiriesActionTypes
): WeddingInquiryState => {
  switch (action.type) {
    case FETCH_WEDDING_INQUIRES_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        weddingInquiriesPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_WEDDING_INQUIRES_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        weddingInquiriesPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        weddingInquiriesPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default weddingInquiriesReducer;
