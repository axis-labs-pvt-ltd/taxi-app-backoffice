import { ReduxState, ReduxStatus } from "../../types/Redux.types";
import { UsersPaginatedType } from "../../types/Users.types";

export const FETCH_USERS_PAGINATED_REQUEST = "FETCH_USERS_PAGINATED_REQUEST";
export const FETCH_USERS_PAGINATED_SUCCESS = "FETCH_USERS_PAGINATED_SUCCESS";
export const FETCH_USERS_PAGINATED_FAILURE = "FETCH_USERS_PAGINATED_FAILURE";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const RESET_ADD_USER_SUCCESS = "RESET_ADD_USER_SUCCESS";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const RESET_RESET_PASSWORD_SUCCESS = "RESET_RESET_PASSWORD_SUCCESS";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const RESET_DELETE_USER_SUCCESS = "RESET_DELETE_USER_SUCCESS";

interface UserState {
  loading: boolean;
  usersPaginated: ReduxState<UsersPaginatedType | null>;
  addUserSuccess: ReduxStatus;
  resetPasswordSuccess: ReduxStatus;
  deleteUserSuccess: ReduxStatus;
}

const initialState: UserState = {
  loading: false,
  usersPaginated: { data: null, loading: false, error: null },
  addUserSuccess: { status: false, loading: false, error: null },
  resetPasswordSuccess: { status: false, loading: false, error: null },
  deleteUserSuccess: { status: false, loading: false, error: null },
};

interface FetchUsersPaginatedRequestAction {
  type: typeof FETCH_USERS_PAGINATED_REQUEST;
}

interface FetchUsersPaginatedSuccessAction {
  type: typeof FETCH_USERS_PAGINATED_SUCCESS;
  payload: UsersPaginatedType;
}

interface FetchUsersPaginatedFailureAction {
  type: typeof FETCH_USERS_PAGINATED_FAILURE;
  payload: string;
}

interface AddUserRequestAction {
  type: typeof ADD_USER_REQUEST;
}

interface AddUserSuccessAction {
  type: typeof ADD_USER_SUCCESS;
}

interface AddUserFailureAction {
  type: typeof ADD_USER_FAILURE;
  payload: string;
}

interface ResetAddUserSuccessAction {
  type: typeof RESET_ADD_USER_SUCCESS;
}

interface ResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_REQUEST;
}

interface ResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
}

interface ResetPasswordFailureAction {
  type: typeof RESET_PASSWORD_FAILURE;
  payload: string;
}

interface ResetResetPasswordSuccessAction {
  type: typeof RESET_RESET_PASSWORD_SUCCESS;
}

interface DeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST;
}

interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
}

interface DeleteUserFailureAction {
  type: typeof DELETE_USER_FAILURE;
  payload: string;
}

interface ResetDeleteUserSuccessAction {
  type: typeof RESET_DELETE_USER_SUCCESS;
}

export type UsersActionTypes =
  | FetchUsersPaginatedRequestAction
  | FetchUsersPaginatedSuccessAction
  | FetchUsersPaginatedFailureAction
  | AddUserRequestAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | ResetAddUserSuccessAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction
  | ResetResetPasswordSuccessAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction
  | ResetDeleteUserSuccessAction;

const usersReducer = (
  state = initialState,
  action: UsersActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USERS_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        usersPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_USERS_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        usersPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_USERS_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        usersPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        addUserSuccess: { status: false, error: null, loading: true },
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        addUserSuccess: { status: true, error: null, loading: false },
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        addUserSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        addUserSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        resetPasswordSuccess: { status: false, error: null, loading: true },
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: { status: true, error: null, loading: false },
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        deleteUserSuccess: { status: false, error: null, loading: true },
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteUserSuccess: { status: true, error: null, loading: false },
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        deleteUserSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteUserSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default usersReducer;
