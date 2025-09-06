import Cookies from "js-cookie";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

interface AuthState {
  accessToken: string | null;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: Cookies.get("access_token") || null,
  user: JSON.parse(Cookies.get("user") || "null"),
  isAuthenticated: !!Cookies.get("access_token"),
  loading: false,
  error: null,
};

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    accessToken: string;
    user: any;
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return { ...initialState, isAuthenticated: false };

    default:
      return state;
  }
};

export default authReducer;
