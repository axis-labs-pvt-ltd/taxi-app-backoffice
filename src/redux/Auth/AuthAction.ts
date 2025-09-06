import Cookies from "js-cookie";
import { Dispatch } from "redux";
import API_BASE_URLS from "../../config/api";
import { LoginReturnType } from "../../types/Auth.types";
import {
  ReduxActionReturnType,
  ReduxActiontypes,
} from "../../types/Common.types";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./AuthReducer";

export const login = (credentials: {
  username: string;
  password: string;
}): ((
  dispatch: Dispatch
) => Promise<ReduxActionReturnType<LoginReturnType>>) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await fetch(`${API_BASE_URLS.backendAPI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set("access_token", data.token);
        Cookies.set("user", JSON.stringify(data.details));

        dispatch({ type: LOGIN_SUCCESS, payload: data });

        return {
          type: ReduxActiontypes.SUCCESS,
          payload: {
            access_token: data.accessToken,
            user: data.user,
          },
        };
      } else {
        throw new Error(
          data.message || "Failed to login try please check your credentials"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        return { type: ReduxActiontypes.ERROR, error: error.message };
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: "An unknown error occurred" });
        return {
          type: ReduxActiontypes.ERROR,
          error: "An unknown error occurred",
        };
      }
    }
  };
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("user");
  return { type: LOGOUT };
};
