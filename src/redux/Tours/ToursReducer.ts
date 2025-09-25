import { ReduxState, ReduxStatus } from "../../types/Redux.types";
import { ToursPaginatedType } from "../../types/Tours.types";

export const FETCH_TOURS_PAGINATED_REQUEST = "FETCH_TOURS_PAGINATED_REQUEST";
export const FETCH_TOURS_PAGINATED_SUCCESS = "FETCH_TOURS_PAGINATED_SUCCESS";
export const FETCH_TOURS_PAGINATED_FAILURE = "FETCH_TOURS_PAGINATED_FAILURE";
export const ADD_TOUR_REQUEST = "ADD_TOUR_REQUEST";
export const ADD_TOUR_SUCCESS = "ADD_TOUR_SUCCESS";
export const ADD_TOUR_FAILURE = "ADD_TOUR_FAILURE";
export const RESET_ADD_TOUR_SUCCESS = "RESET_ADD_TOUR_SUCCESS";
export const DELETE_TOUR_REQUEST = "DELETE_TOUR_REQUEST";
export const DELETE_TOUR_SUCCESS = "DELETE_TOUR_SUCCESS";
export const DELETE_TOUR_FAILURE = "DELETE_TOUR_FAILURE";
export const RESET_DELETE_TOUR_SUCCESS = "RESET_DELETE_TOUR_SUCCESS";

interface TourState {
  loading: boolean;
  toursPaginated: ReduxState<ToursPaginatedType | null>;
  addTourSuccess: ReduxStatus;
  deleteTourSuccess: ReduxStatus;
}

const initialState: TourState = {
  loading: false,
  toursPaginated: { data: null, loading: false, error: null },
  addTourSuccess: { status: false, loading: false, error: null },
  deleteTourSuccess: { status: false, loading: false, error: null },
};

interface FetchToursPaginatedRequestAction {
  type: typeof FETCH_TOURS_PAGINATED_REQUEST;
}

interface FetchToursPaginatedSuccessAction {
  type: typeof FETCH_TOURS_PAGINATED_SUCCESS;
  payload: ToursPaginatedType;
}

interface FetchToursPaginatedFailureAction {
  type: typeof FETCH_TOURS_PAGINATED_FAILURE;
  payload: string;
}

interface AddTourRequestAction {
  type: typeof ADD_TOUR_REQUEST;
}

interface AddTourSuccessAction {
  type: typeof ADD_TOUR_SUCCESS;
}

interface AddTourFailureAction {
  type: typeof ADD_TOUR_FAILURE;
  payload: string;
}

interface ResetAddTourSuccessAction {
  type: typeof RESET_ADD_TOUR_SUCCESS;
}

interface DeleteTourRequestAction {
  type: typeof DELETE_TOUR_REQUEST;
}

interface DeleteTourSuccessAction {
  type: typeof DELETE_TOUR_SUCCESS;
}

interface DeleteTourFailureAction {
  type: typeof DELETE_TOUR_FAILURE;
  payload: string;
}

interface ResetDeleteTourSuccessAction {
  type: typeof RESET_DELETE_TOUR_SUCCESS;
}

export type ToursActionTypes =
  | FetchToursPaginatedRequestAction
  | FetchToursPaginatedSuccessAction
  | FetchToursPaginatedFailureAction
  | AddTourRequestAction
  | AddTourSuccessAction
  | AddTourFailureAction
  | ResetAddTourSuccessAction
  | DeleteTourRequestAction
  | DeleteTourSuccessAction
  | DeleteTourFailureAction
  | ResetDeleteTourSuccessAction;

const toursReducer = (
  state = initialState,
  action: ToursActionTypes
): TourState => {
  switch (action.type) {
    case FETCH_TOURS_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        toursPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_TOURS_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        toursPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_TOURS_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        toursPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case ADD_TOUR_REQUEST:
      return {
        ...state,
        loading: true,
        addTourSuccess: { status: false, error: null, loading: true },
      };
    case ADD_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        addTourSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case ADD_TOUR_FAILURE:
      return {
        ...state,
        loading: false,
        addTourSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        addTourSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_TOUR_REQUEST:
      return {
        ...state,
        loading: true,
        deleteTourSuccess: { status: false, error: null, loading: true },
      };
    case DELETE_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteTourSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case DELETE_TOUR_FAILURE:
      return {
        ...state,
        loading: false,
        deleteTourSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteTourSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default toursReducer;
