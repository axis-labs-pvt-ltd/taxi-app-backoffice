import { ExtraServicePaginatedType } from "../../types/ExtraServices.types";
import { ReduxState, ReduxStatus } from "../../types/Redux.types";

export const FETCH_EXTRASERVICES_PAGINATED_REQUEST =
  "FETCH_EXTRASERVICES_PAGINATED_REQUEST";
export const FETCH_EXTRASERVICES_PAGINATED_SUCCESS =
  "FETCH_EXTRASERVICES_PAGINATED_SUCCESS";
export const FETCH_EXTRASERVICES_PAGINATED_FAILURE =
  "FETCH_EXTRASERVICES_PAGINATED_FAILURE";
export const ADD_EXTRASERVICE_REQUEST = "ADD_EXTRASERVICE_REQUEST";
export const ADD_EXTRASERVICE_SUCCESS = "ADD_EXTRASERVICE_SUCCESS";
export const ADD_EXTRASERVICE_FAILURE = "ADD_EXTRASERVICE_FAILURE";
export const RESET_ADD_EXTRASERVICE_SUCCESS = "RESET_ADD_EXTRASERVICE_SUCCESS";
export const DELETE_EXTRASERVICE_REQUEST = "DELETE_EXTRASERVICE_REQUEST";
export const DELETE_EXTRASERVICE_SUCCESS = "DELETE_EXTRASERVICE_SUCCESS";
export const DELETE_EXTRASERVICE_FAILURE = "DELETE_EXTRASERVICE_FAILURE";
export const RESET_DELETE_EXTRASERVICE_SUCCESS =
  "RESET_DELETE_EXTRASERVICE_SUCCESS";

interface ExtraServiceState {
  loading: boolean;
  extraServicesPaginated: ReduxState<ExtraServicePaginatedType | null>;
  addExtraServiceSuccess: ReduxStatus;
  deleteExtraServiceSuccess: ReduxStatus;
}

const initialState: ExtraServiceState = {
  loading: false,
  extraServicesPaginated: { data: null, loading: false, error: null },
  addExtraServiceSuccess: { status: false, loading: false, error: null },
  deleteExtraServiceSuccess: { status: false, loading: false, error: null },
};

interface FetchExtraServicePaginatedRequestAction {
  type: typeof FETCH_EXTRASERVICES_PAGINATED_REQUEST;
}

interface FetchExtraServicePaginatedSuccessAction {
  type: typeof FETCH_EXTRASERVICES_PAGINATED_SUCCESS;
  payload: ExtraServicePaginatedType;
}

interface FetchExtraServicePaginatedFailureAction {
  type: typeof FETCH_EXTRASERVICES_PAGINATED_FAILURE;
  payload: string;
}

interface AddExtraServiceRequestAction {
  type: typeof ADD_EXTRASERVICE_REQUEST;
}

interface AddExtraServiceSuccessAction {
  type: typeof ADD_EXTRASERVICE_SUCCESS;
}

interface AddExtraServiceFailureAction {
  type: typeof ADD_EXTRASERVICE_FAILURE;
  payload: string;
}

interface ResetAddExtraServiceSuccessAction {
  type: typeof RESET_ADD_EXTRASERVICE_SUCCESS;
}

interface DeleteExtraServiceRequestAction {
  type: typeof DELETE_EXTRASERVICE_REQUEST;
}

interface DeleteExtraServiceSuccessAction {
  type: typeof DELETE_EXTRASERVICE_SUCCESS;
}

interface DeleteExtraServiceFailureAction {
  type: typeof DELETE_EXTRASERVICE_FAILURE;
  payload: string;
}

interface ResetDeleteExtraServiceSuccessAction {
  type: typeof RESET_DELETE_EXTRASERVICE_SUCCESS;
}

export type ExtraServiceActionTypes =
  | FetchExtraServicePaginatedRequestAction
  | FetchExtraServicePaginatedSuccessAction
  | FetchExtraServicePaginatedFailureAction
  | AddExtraServiceRequestAction
  | AddExtraServiceSuccessAction
  | AddExtraServiceFailureAction
  | ResetAddExtraServiceSuccessAction
  | DeleteExtraServiceRequestAction
  | DeleteExtraServiceSuccessAction
  | DeleteExtraServiceFailureAction
  | ResetDeleteExtraServiceSuccessAction;

const extraServicesReducer = (
  state = initialState,
  action: ExtraServiceActionTypes
): ExtraServiceState => {
  switch (action.type) {
    case FETCH_EXTRASERVICES_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        extraServicesPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_EXTRASERVICES_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        extraServicesPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_EXTRASERVICES_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        extraServicesPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case ADD_EXTRASERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        addExtraServiceSuccess: { status: false, error: null, loading: true },
      };
    case ADD_EXTRASERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        addExtraServiceSuccess: { status: true, error: null, loading: false },
      };
    case ADD_EXTRASERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        addExtraServiceSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_EXTRASERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        addExtraServiceSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_EXTRASERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        deleteExtraServiceSuccess: {
          status: false,
          error: null,
          loading: true,
        },
      };
    case DELETE_EXTRASERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteExtraServiceSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case DELETE_EXTRASERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        deleteExtraServiceSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_EXTRASERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteExtraServiceSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default extraServicesReducer;
