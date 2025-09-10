import { InquiryPaginatedType } from "../../types/Inquiries.types";
import { ReduxState, ReduxStatus } from "../../types/Redux.types";

export const FETCH_INQUIRES_PAGINATED_REQUEST =
  "FETCH_INQUIRES_PAGINATED_REQUEST";
export const FETCH_INQUIRES_PAGINATED_SUCCESS =
  "FETCH_INQUIRES_PAGINATED_SUCCESS";
export const FETCH_INQUIRES_PAGINATED_FAILURE =
  "FETCH_INQUIRES_PAGINATED_FAILURE";
export const UPDATE_INQUIRY_REQUEST = "UPDATE_INQUIRY_REQUEST";
export const UPDATE_INQUIRY_SUCCESS = "UPDATE_INQUIRY_SUCCESS";
export const UPDATE_INQUIRY_FAILURE = "UPDATE_INQUIRY_FAILURE";
export const RESET_UPDATE_INQUIRY_SUCCESS = "RESET_UPDATE_INQUIRY_SUCCESS";

interface InquiryState {
  loading: boolean;
  inquiriesPaginated: ReduxState<InquiryPaginatedType | null>;
  updateInquirySuccess: ReduxStatus;
}

const initialState: InquiryState = {
  loading: false,
  inquiriesPaginated: { data: null, loading: false, error: null },
  updateInquirySuccess: { status: false, loading: false, error: null },
};

interface FetchInquiriesPaginatedRequestAction {
  type: typeof FETCH_INQUIRES_PAGINATED_REQUEST;
}

interface FetchInquiriesPaginatedSuccessAction {
  type: typeof FETCH_INQUIRES_PAGINATED_SUCCESS;
  payload: InquiryPaginatedType;
}

interface FetchInquiriesPaginatedFailureAction {
  type: typeof FETCH_INQUIRES_PAGINATED_FAILURE;
  payload: string;
}

interface UpdateInquiryRequestAction {
  type: typeof UPDATE_INQUIRY_REQUEST;
}

interface UpdateInquirySuccessAction {
  type: typeof UPDATE_INQUIRY_SUCCESS;
}

interface UpdateInquiryFailureAction {
  type: typeof UPDATE_INQUIRY_FAILURE;
  payload: string;
}

interface ResetUpdateInquirySuccessAction {
  type: typeof RESET_UPDATE_INQUIRY_SUCCESS;
}

export type InquiriesActionTypes =
  | FetchInquiriesPaginatedRequestAction
  | FetchInquiriesPaginatedSuccessAction
  | FetchInquiriesPaginatedFailureAction
  | UpdateInquiryRequestAction
  | UpdateInquirySuccessAction
  | UpdateInquiryFailureAction
  | ResetUpdateInquirySuccessAction;

const inquiriesReducer = (
  state = initialState,
  action: InquiriesActionTypes
): InquiryState => {
  switch (action.type) {
    case FETCH_INQUIRES_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        inquiriesPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_INQUIRES_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        inquiriesPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_INQUIRES_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        inquiriesPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case UPDATE_INQUIRY_REQUEST:
      return {
        ...state,
        loading: true,
        updateInquirySuccess: { status: false, error: null, loading: true },
      };
    case UPDATE_INQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        updateInquirySuccess: { status: true, error: null, loading: false },
      };
    case UPDATE_INQUIRY_FAILURE:
      return {
        ...state,
        loading: false,
        updateInquirySuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_UPDATE_INQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        updateInquirySuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default inquiriesReducer;
