import { ReduxState, ReduxStatus } from "../../types/Redux.types";
import { VehiclePaginatedType } from "../../types/Vehicle.types";

export const FETCH_VEHICLES_PAGINATED_REQUEST =
  "FETCH_VEHICLES_PAGINATED_REQUEST";
export const FETCH_VEHICLES_PAGINATED_SUCCESS =
  "FETCH_VEHICLES_PAGINATED_SUCCESS";
export const FETCH_VEHICLES_PAGINATED_FAILURE =
  "FETCH_VEHICLES_PAGINATED_FAILURE";
export const FETCH_VEHICLE_TYPES_REQUEST = "FETCH_VEHICLE_TYPES_REQUEST";
export const FETCH_VEHICLE_TYPES_SUCCESS = "FETCH_VEHICLE_TYPES_SUCCESS";
export const FETCH_VEHICLE_TYPES_FAILURE = "FETCH_VEHICLE_TYPES_FAILURE";
export const ADD_VEHICLE_REQUEST = "ADD_VEHICLE_REQUEST";
export const ADD_VEHICLE_SUCCESS = "ADD_VEHICLE_SUCCESS";
export const ADD_VEHICLE_FAILURE = "ADD_VEHICLE_FAILURE";
export const RESET_ADD_VEHICLE_SUCCESS = "RESET_ADD_VEHICLE_SUCCESS";
export const DELETE_VEHICLE_REQUEST = "DELETE_VEHICLE_REQUEST";
export const DELETE_VEHICLE_SUCCESS = "DELETE_VEHICLE_SUCCESS";
export const DELETE_VEHICLE_FAILURE = "DELETE_VEHICLE_FAILURE";
export const RESET_DELETE_VEHICLE_SUCCESS = "RESET_DELETE_VEHICLE_SUCCESS";

interface VehicleState {
  loading: boolean;
  vehiclesPaginated: ReduxState<VehiclePaginatedType | null>;
  vehicleTypes: ReduxState<string[] | null>;
  addVehicleSuccess: ReduxStatus;
  deleteVehicleSuccess: ReduxStatus;
}

const initialState: VehicleState = {
  loading: false,
  vehiclesPaginated: { data: null, loading: false, error: null },
  vehicleTypes: { data: null, loading: false, error: null },
  addVehicleSuccess: { status: false, loading: false, error: null },
  deleteVehicleSuccess: { status: false, loading: false, error: null },
};

interface FetchVehiclesPaginatedRequestAction {
  type: typeof FETCH_VEHICLES_PAGINATED_REQUEST;
}

interface FetchVehiclesPaginatedSuccessAction {
  type: typeof FETCH_VEHICLES_PAGINATED_SUCCESS;
  payload: VehiclePaginatedType;
}

interface FetchVehiclesPaginatedFailureAction {
  type: typeof FETCH_VEHICLES_PAGINATED_FAILURE;
  payload: string;
}

interface FetchVehicleTypesRequestAction {
  type: typeof FETCH_VEHICLE_TYPES_REQUEST;
}

interface FetchVehicleTypesSuccessAction {
  type: typeof FETCH_VEHICLE_TYPES_SUCCESS;
  payload: string[];
}

interface FetchVehicleTypesFailureAction {
  type: typeof FETCH_VEHICLE_TYPES_FAILURE;
  payload: string;
}

interface AddVehicleRequestAction {
  type: typeof ADD_VEHICLE_REQUEST;
}

interface AddVehicleSuccessAction {
  type: typeof ADD_VEHICLE_SUCCESS;
}

interface AddVehicleFailureAction {
  type: typeof ADD_VEHICLE_FAILURE;
  payload: string;
}

interface ResetAddVehicleSuccessAction {
  type: typeof RESET_ADD_VEHICLE_SUCCESS;
}

interface DeleteVehicleRequestAction {
  type: typeof DELETE_VEHICLE_REQUEST;
}

interface DeleteVehicleSuccessAction {
  type: typeof DELETE_VEHICLE_SUCCESS;
}

interface DeleteVehicleFailureAction {
  type: typeof DELETE_VEHICLE_FAILURE;
  payload: string;
}

interface ResetDeleteVehicleSuccessAction {
  type: typeof RESET_DELETE_VEHICLE_SUCCESS;
}

export type VehiclesActionTypes =
  | FetchVehiclesPaginatedRequestAction
  | FetchVehiclesPaginatedSuccessAction
  | FetchVehiclesPaginatedFailureAction
  | FetchVehicleTypesRequestAction
  | FetchVehicleTypesSuccessAction
  | FetchVehicleTypesFailureAction
  | AddVehicleRequestAction
  | AddVehicleSuccessAction
  | AddVehicleFailureAction
  | ResetAddVehicleSuccessAction
  | DeleteVehicleRequestAction
  | DeleteVehicleSuccessAction
  | DeleteVehicleFailureAction
  | ResetDeleteVehicleSuccessAction;

const vehiclesReducer = (
  state = initialState,
  action: VehiclesActionTypes
): VehicleState => {
  switch (action.type) {
    case FETCH_VEHICLES_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        vehiclesPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_VEHICLES_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        vehiclesPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_VEHICLES_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        vehiclesPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case FETCH_VEHICLE_TYPES_REQUEST:
      return {
        ...state,
        loading: true,
        vehicleTypes: { data: null, error: null, loading: true },
      };
    case FETCH_VEHICLE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleTypes: { data: action.payload, error: null, loading: false },
      };
    case FETCH_VEHICLE_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        vehicleTypes: { data: null, error: action.payload, loading: false },
      };

    case ADD_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
        addVehicleSuccess: { status: false, error: null, loading: true },
      };
    case ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        addVehicleSuccess: { status: true, error: null, loading: false },
      };
    case ADD_VEHICLE_FAILURE:
      return {
        ...state,
        loading: false,
        addVehicleSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        addVehicleSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
        deleteVehicleSuccess: { status: false, error: null, loading: true },
      };
    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteVehicleSuccess: { status: true, error: null, loading: false },
      };
    case DELETE_VEHICLE_FAILURE:
      return {
        ...state,
        loading: false,
        deleteVehicleSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteVehicleSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default vehiclesReducer;
