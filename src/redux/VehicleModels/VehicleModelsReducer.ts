import { ReduxState, ReduxStatus } from "../../types/Redux.types";
import {
  VehicleModelsEssentialType,
  VehicleModelsPaginatedType,
} from "../../types/VehicleModels.types";

export const FETCH_VEHICLE_MODELS_REQUEST = "FETCH_VEHICLE_MODELS_REQUEST";
export const FETCH_VEHICLE_MODELS_SUCCESS = "FETCH_VEHICLE_MODELS_SUCCESS";
export const FETCH_VEHICLE_MODELS_FAILURE = "FETCH_VEHICLE_MODELS_FAILURE";
export const FETCH_VEHICLE_MODELS_PAGINATED_REQUEST =
  "FETCH_VEHICLE_MODELS_PAGINATED_REQUEST";
export const FETCH_VEHICLE_MODELS_PAGINATED_SUCCESS =
  "FETCH_VEHICLE_MODELS_PAGINATED_SUCCESS";
export const FETCH_VEHICLE_MODELS_PAGINATED_FAILURE =
  "FETCH_VEHICLE_MODELS_PAGINATED_FAILURE";
export const ADD_VEHICLE_MODEL_REQUEST = "ADD_VEHICLE_MODEL_REQUEST";
export const ADD_VEHICLE_MODEL_SUCCESS = "ADD_VEHICLE_MODEL_SUCCESS";
export const ADD_VEHICLE_MODEL_FAILURE = "ADD_VEHICLE_MODEL_FAILURE";
export const RESET_ADD_VEHICLE_MODEL_SUCCESS =
  "RESET_ADD_VEHICLE_MODEL_SUCCESS";
export const DELETE_VEHICLE_MODEL_REQUEST = "DELETE_VEHICLE_MODEL_REQUEST";
export const DELETE_VEHICLE_MODEL_SUCCESS = "DELETE_VEHICLE_MODEL_SUCCESS";
export const DELETE_VEHICLE_MODEL_FAILURE = "DELETE_VEHICLE_MODEL_FAILURE";
export const RESET_DELETE_VEHICLE_MODEL_SUCCESS =
  "RESET_DELETE_VEHICLE_MODEL_SUCCESS";

interface VehicleModelState {
  loading: boolean;
  vehicleModelsEssentials: ReduxState<VehicleModelsEssentialType[] | null>;
  vehicleModelsPaginated: ReduxState<VehicleModelsPaginatedType | null>;
  addVehicleModelSuccess: ReduxStatus;
  deleteVehicleModelSuccess: ReduxStatus;
}

const initialState: VehicleModelState = {
  loading: false,
  vehicleModelsEssentials: { data: null, loading: false, error: null },
  vehicleModelsPaginated: { data: null, loading: false, error: null },
  addVehicleModelSuccess: { status: false, loading: false, error: null },
  deleteVehicleModelSuccess: { status: false, loading: false, error: null },
};

interface FetchVehicleModelsRequestAction {
  type: typeof FETCH_VEHICLE_MODELS_REQUEST;
}

interface FetchVehicleModelsSuccessAction {
  type: typeof FETCH_VEHICLE_MODELS_SUCCESS;
  payload: VehicleModelsEssentialType[];
}

interface FetchVehicleModelsFailureAction {
  type: typeof FETCH_VEHICLE_MODELS_FAILURE;
  payload: string;
}

interface FetchVehicleModelsPaginatedRequestAction {
  type: typeof FETCH_VEHICLE_MODELS_PAGINATED_REQUEST;
}

interface FetchVehicleModelsPaginatedSuccessAction {
  type: typeof FETCH_VEHICLE_MODELS_PAGINATED_SUCCESS;
  payload: VehicleModelsPaginatedType;
}

interface FetchVehicleModelsPaginatedFailureAction {
  type: typeof FETCH_VEHICLE_MODELS_PAGINATED_FAILURE;
  payload: string;
}

interface AddVehicleModelRequestAction {
  type: typeof ADD_VEHICLE_MODEL_REQUEST;
}

interface AddVehicleModelSuccessAction {
  type: typeof ADD_VEHICLE_MODEL_SUCCESS;
}

interface AddVehicleModelFailureAction {
  type: typeof ADD_VEHICLE_MODEL_FAILURE;
  payload: string;
}

interface ResetAddVehicleModelSuccessAction {
  type: typeof RESET_ADD_VEHICLE_MODEL_SUCCESS;
}

interface DeleteVehicleModelRequestAction {
  type: typeof DELETE_VEHICLE_MODEL_REQUEST;
}

interface DeleteVehicleModelSuccessAction {
  type: typeof DELETE_VEHICLE_MODEL_SUCCESS;
}

interface DeleteVehicleModelFailureAction {
  type: typeof DELETE_VEHICLE_MODEL_FAILURE;
  payload: string;
}

interface ResetDeleteVehicleModelSuccessAction {
  type: typeof RESET_DELETE_VEHICLE_MODEL_SUCCESS;
}

export type VehicleModelsActionTypes =
  | FetchVehicleModelsRequestAction
  | FetchVehicleModelsSuccessAction
  | FetchVehicleModelsFailureAction
  | FetchVehicleModelsPaginatedRequestAction
  | FetchVehicleModelsPaginatedSuccessAction
  | FetchVehicleModelsPaginatedFailureAction
  | AddVehicleModelRequestAction
  | AddVehicleModelSuccessAction
  | AddVehicleModelFailureAction
  | ResetAddVehicleModelSuccessAction
  | DeleteVehicleModelRequestAction
  | DeleteVehicleModelSuccessAction
  | DeleteVehicleModelFailureAction
  | ResetDeleteVehicleModelSuccessAction;

const vehicleModelsReducer = (
  state = initialState,
  action: VehicleModelsActionTypes
): VehicleModelState => {
  switch (action.type) {
    case FETCH_VEHICLE_MODELS_REQUEST:
      return {
        ...state,
        loading: true,
        vehicleModelsEssentials: { data: null, error: null, loading: true },
      };
    case FETCH_VEHICLE_MODELS_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleModelsEssentials: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_VEHICLE_MODELS_FAILURE:
      return {
        ...state,
        loading: false,
        vehicleModelsEssentials: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case FETCH_VEHICLE_MODELS_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        vehicleModelsPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_VEHICLE_MODELS_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleModelsPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_VEHICLE_MODELS_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        vehicleModelsPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case ADD_VEHICLE_MODEL_REQUEST:
      return {
        ...state,
        loading: true,
        addVehicleModelSuccess: { status: false, error: null, loading: true },
      };
    case ADD_VEHICLE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        addVehicleModelSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case ADD_VEHICLE_MODEL_FAILURE:
      return {
        ...state,
        loading: false,
        addVehicleModelSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_VEHICLE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        addVehicleModelSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_VEHICLE_MODEL_REQUEST:
      return {
        ...state,
        loading: true,
        deleteVehicleModelSuccess: {
          status: false,
          error: null,
          loading: true,
        },
      };
    case DELETE_VEHICLE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteVehicleModelSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case DELETE_VEHICLE_MODEL_FAILURE:
      return {
        ...state,
        loading: false,
        deleteVehicleModelSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_VEHICLE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteVehicleModelSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default vehicleModelsReducer;
