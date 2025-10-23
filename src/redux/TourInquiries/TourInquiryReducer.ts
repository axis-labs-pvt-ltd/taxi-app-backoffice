import { ReduxState } from "../../types/Redux.types";
import { TourInquiryPaginatedType } from "../../types/TourInquiry.types";

export const FETCH_TOUR_INQUIRES_PAGINATED_REQUEST =
  "FETCH_TOUR_INQUIRES_PAGINATED_REQUEST";
export const FETCH_TOUR_INQUIRES_PAGINATED_SUCCESS =
  "FETCH_TOUR_INQUIRES_PAGINATED_SUCCESS";
export const FETCH_TOUR_INQUIRES_PAGINATED_FAILURE =
  "FETCH_TOUR_INQUIRES_PAGINATED_FAILURE";

interface TourInquiryState {
  loading: boolean;
  tourInquiriesPaginated: ReduxState<TourInquiryPaginatedType | null>;
}

const initialState: TourInquiryState = {
  loading: false,
  tourInquiriesPaginated: { data: null, loading: false, error: null },
};

interface FetchTourInquiriesPaginatedRequestAction {
  type: typeof FETCH_TOUR_INQUIRES_PAGINATED_REQUEST;
}

interface FetchTourInquiriesPaginatedSuccessAction {
  type: typeof FETCH_TOUR_INQUIRES_PAGINATED_SUCCESS;
  payload: TourInquiryPaginatedType;
}

interface FetchTourInquiriesPaginatedFailureAction {
  type: typeof FETCH_TOUR_INQUIRES_PAGINATED_FAILURE;
  payload: string;
}

export type TourInquiriesActionTypes =
  | FetchTourInquiriesPaginatedRequestAction
  | FetchTourInquiriesPaginatedSuccessAction
  | FetchTourInquiriesPaginatedFailureAction;

const tourInquiriesReducer = (
  state = initialState,
  action: TourInquiriesActionTypes
): TourInquiryState => {
  switch (action.type) {
    case FETCH_TOUR_INQUIRES_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        tourInquiriesPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_TOUR_INQUIRES_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        tourInquiriesPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_TOUR_INQUIRES_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        tourInquiriesPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default tourInquiriesReducer;
