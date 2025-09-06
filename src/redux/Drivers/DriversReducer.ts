import { DriversPaginatedType } from "../../types/Drivers.types";
import { ReduxState, ReduxStatus } from "../../types/Redux.types";

export const FETCH_DRIVERS_PAGINATED_REQUEST =
  "FETCH_DRIVERS_PAGINATED_REQUEST";
export const FETCH_DRIVERS_PAGINATED_SUCCESS =
  "FETCH_DRIVERS_PAGINATED_SUCCESS";
export const FETCH_DRIVERS_PAGINATED_FAILURE =
  "FETCH_DRIVERS_PAGINATED_FAILURE";
export const FETCH_DRIVER_TYPES_REQUEST = "FETCH_DRIVER_TYPES_REQUEST";
export const FETCH_DRIVER_TYPES_SUCCESS = "FETCH_DRIVER_TYPES_SUCCESS";
export const FETCH_DRIVER_TYPES_FAILURE = "FETCH_DRIVER_TYPES_FAILURE";
export const FETCH_DRIVER_STATUS_REQUEST = "FETCH_DRIVER_STATUS_REQUEST";
export const FETCH_DRIVER_STATUS_SUCCESS = "FETCH_DRIVER_STATUS_SUCCESS";
export const FETCH_DRIVER_STATUS_FAILURE = "FETCH_DRIVER_STATUS_FAILURE";
export const ADD_DRIVER_REQUEST = "ADD_DRIVER_REQUEST";
export const ADD_DRIVER_SUCCESS = "ADD_DRIVER_SUCCESS";
export const ADD_DRIVER_FAILURE = "ADD_DRIVER_FAILURE";
export const RESET_ADD_DRIVER_SUCCESS = "RESET_ADD_DRIVER_SUCCESS";
export const DELETE_DRIVER_REQUEST = "DELETE_DRIVER_REQUEST";
export const DELETE_DRIVER_SUCCESS = "DELETE_DRIVER_SUCCESS";
export const DELETE_DRIVER_FAILURE = "DELETE_DRIVER_FAILURE";
export const RESET_DELETE_DRIVER_SUCCESS = "RESET_DELETE_DRIVER_SUCCESS";

interface DriverState {
  loading: boolean;
  driversPaginated: ReduxState<DriversPaginatedType | null>;
  driverTypes: ReduxState<string[] | null>;
  driverStatus: ReduxState<string[] | null>;
  addDriverSuccess: ReduxStatus;
  deleteDriverSuccess: ReduxStatus;
}

const initialState: DriverState = {
  loading: false,
  driversPaginated: { data: null, loading: false, error: null },
  driverTypes: { data: null, loading: false, error: null },
  driverStatus: { data: null, loading: false, error: null },
  addDriverSuccess: { status: false, loading: false, error: null },
  deleteDriverSuccess: { status: false, loading: false, error: null },
};

interface FetchDriversPaginatedRequestAction {
  type: typeof FETCH_DRIVERS_PAGINATED_REQUEST;
}

interface FetchDriversPaginatedSuccessAction {
  type: typeof FETCH_DRIVERS_PAGINATED_SUCCESS;
  payload: DriversPaginatedType;
}

interface FetchDriversPaginatedFailureAction {
  type: typeof FETCH_DRIVERS_PAGINATED_FAILURE;
  payload: string;
}

interface FetchDriverTypesRequestAction {
  type: typeof FETCH_DRIVER_TYPES_REQUEST;
}

interface FetchDriverTypesSuccessAction {
  type: typeof FETCH_DRIVER_TYPES_SUCCESS;
  payload: string[];
}

interface FetchDriverTypesFailureAction {
  type: typeof FETCH_DRIVER_TYPES_FAILURE;
  payload: string;
}

interface FetchDriverStatusRequestAction {
  type: typeof FETCH_DRIVER_STATUS_REQUEST;
}

interface FetchDriverStatusSuccessAction {
  type: typeof FETCH_DRIVER_STATUS_SUCCESS;
  payload: string[];
}

interface FetchDriverStatusFailureAction {
  type: typeof FETCH_DRIVER_STATUS_FAILURE;
  payload: string;
}

interface AddDriverRequestAction {
  type: typeof ADD_DRIVER_REQUEST;
}

interface AddDriverSuccessAction {
  type: typeof ADD_DRIVER_SUCCESS;
}

interface AddDriverFailureAction {
  type: typeof ADD_DRIVER_FAILURE;
  payload: string;
}

interface ResetAddDriverSuccessAction {
  type: typeof RESET_ADD_DRIVER_SUCCESS;
}

interface DeleteDriverRequestAction {
  type: typeof DELETE_DRIVER_REQUEST;
}

interface DeleteDriverSuccessAction {
  type: typeof DELETE_DRIVER_SUCCESS;
}

interface DeleteDriverFailureAction {
  type: typeof DELETE_DRIVER_FAILURE;
  payload: string;
}

interface ResetDeleteDriverSuccessAction {
  type: typeof RESET_DELETE_DRIVER_SUCCESS;
}

export type DriversActionTypes =
  | FetchDriversPaginatedRequestAction
  | FetchDriversPaginatedSuccessAction
  | FetchDriversPaginatedFailureAction
  | FetchDriverTypesRequestAction
  | FetchDriverTypesSuccessAction
  | FetchDriverTypesFailureAction
  | FetchDriverStatusRequestAction
  | FetchDriverStatusSuccessAction
  | FetchDriverStatusFailureAction
  | AddDriverRequestAction
  | AddDriverSuccessAction
  | AddDriverFailureAction
  | ResetAddDriverSuccessAction
  | DeleteDriverRequestAction
  | DeleteDriverSuccessAction
  | DeleteDriverFailureAction
  | ResetDeleteDriverSuccessAction;

const driversReducer = (
  state = initialState,
  action: DriversActionTypes
): DriverState => {
  switch (action.type) {
    case FETCH_DRIVERS_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        driversPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_DRIVERS_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        driversPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_DRIVERS_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        driversPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case FETCH_DRIVER_TYPES_REQUEST:
      return {
        ...state,
        loading: true,
        driverTypes: { data: null, error: null, loading: true },
      };
    case FETCH_DRIVER_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        driverTypes: { data: action.payload, error: null, loading: false },
      };
    case FETCH_DRIVER_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        driverTypes: { data: null, error: action.payload, loading: false },
      };

    case FETCH_DRIVER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        driverStatus: { data: null, error: null, loading: true },
      };
    case FETCH_DRIVER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        driverStatus: { data: action.payload, error: null, loading: false },
      };
    case FETCH_DRIVER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        driverStatus: { data: null, error: action.payload, loading: false },
      };

    case ADD_DRIVER_REQUEST:
      return {
        ...state,
        loading: true,
        addDriverSuccess: { status: false, error: null, loading: true },
      };
    case ADD_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        addDriverSuccess: { status: true, error: null, loading: false },
      };
    case ADD_DRIVER_FAILURE:
      return {
        ...state,
        loading: false,
        addDriverSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        addDriverSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_DRIVER_REQUEST:
      return {
        ...state,
        loading: true,
        deleteDriverSuccess: { status: false, error: null, loading: true },
      };
    case DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteDriverSuccess: { status: true, error: null, loading: false },
      };
    case DELETE_DRIVER_FAILURE:
      return {
        ...state,
        loading: false,
        deleteDriverSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteDriverSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default driversReducer;
