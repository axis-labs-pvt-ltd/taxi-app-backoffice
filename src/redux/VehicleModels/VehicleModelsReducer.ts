import { ReduxState } from "../../types/Redux.types";
import { VehicleModelsEssentialType } from "../../types/VehicleModels.types";

export const FETCH_VEHICLE_MODELS_REQUEST = "FETCH_VEHICLE_MODELS_REQUEST";
export const FETCH_VEHICLE_MODELS_SUCCESS = "FETCH_VEHICLE_MODELS_SUCCESS";
export const FETCH_VEHICLE_MODELS_FAILURE = "FETCH_VEHICLE_MODELS_FAILURE";

interface VehicleModelState {
  loading: boolean;
  vehicleModelsEssentials: ReduxState<VehicleModelsEssentialType[] | null>;
}

const initialState: VehicleModelState = {
  loading: false,
  vehicleModelsEssentials: { data: null, loading: false, error: null },
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

export type VehicleModelsActionTypes =
  | FetchVehicleModelsRequestAction
  | FetchVehicleModelsSuccessAction
  | FetchVehicleModelsFailureAction;

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

    default:
      return state;
  }
};

export default vehicleModelsReducer;
