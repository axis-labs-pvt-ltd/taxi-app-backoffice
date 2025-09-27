import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_PAGINATED_FAILURE,
  FETCH_USERS_PAGINATED_REQUEST,
  FETCH_USERS_PAGINATED_SUCCESS,
  RESET_ADD_USER_SUCCESS,
  RESET_DELETE_USER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_RESET_PASSWORD_SUCCESS,
  UsersActionTypes,
} from "./UsersReducer";
import axios from "axios";
import Cookies from "js-cookie";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import { ResetPasswordType, UsersDataType } from "../../types/Users.types";

export const fetchUsersPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: FETCH_USERS_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_USERS_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.usersPaginated,
        {
          pageNumber,
          pageSize,
          searchKey,
        }
      )}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_USERS_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_USERS_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addUser =
  (userData: UsersDataType) => async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: ADD_USER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.createUser}`;
      const response = await axios.post(url, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create user");
      }

      dispatch({ type: ADD_USER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetAddUserSuccess = (): UsersActionTypes => ({
  type: RESET_ADD_USER_SUCCESS,
});

export const updateUser =
  (userData: UsersDataType, id: string) =>
  async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: ADD_USER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteUser,
        { id }
      )}`;
      const response = await axios.put(url, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create user");
      }

      dispatch({ type: ADD_USER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const resetPassword =
  (data: ResetPasswordType, id: string) =>
  async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.resetPassword,
        { id }
      )}`;
      const response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to reset password");
      }

      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetResetPasswordSuccess = (): UsersActionTypes => ({
  type: RESET_RESET_PASSWORD_SUCCESS,
});

export const deleteUser =
  (id: string) => async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: DELETE_USER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteUser,
        {
          id,
        }
      )}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete user");
      }

      dispatch({ type: DELETE_USER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetDeleteUserSuccess = (): UsersActionTypes => ({
  type: RESET_DELETE_USER_SUCCESS,
});
