import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  ADD_DRIVER_FAILURE,
  ADD_DRIVER_REQUEST,
  ADD_DRIVER_SUCCESS,
  DELETE_DRIVER_FAILURE,
  DELETE_DRIVER_REQUEST,
  DELETE_DRIVER_SUCCESS,
  DriversActionTypes,
  FETCH_DRIVER_STATUS_FAILURE,
  FETCH_DRIVER_STATUS_REQUEST,
  FETCH_DRIVER_STATUS_SUCCESS,
  FETCH_DRIVER_TYPES_FAILURE,
  FETCH_DRIVER_TYPES_REQUEST,
  FETCH_DRIVER_TYPES_SUCCESS,
  FETCH_DRIVERS_PAGINATED_FAILURE,
  FETCH_DRIVERS_PAGINATED_REQUEST,
  FETCH_DRIVERS_PAGINATED_SUCCESS,
  RESET_ADD_DRIVER_SUCCESS,
  RESET_DELETE_DRIVER_SUCCESS,
} from "./DriversReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { CreateDriveType } from "../../types/Drivers.types";

export const fetchDriversPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<DriversActionTypes>) => {
    dispatch({ type: FETCH_DRIVERS_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_DRIVERS_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.driversPaginated,
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
        type: FETCH_DRIVERS_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_DRIVERS_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchDriverTypes = () => {
  return async (dispatch: Dispatch<DriversActionTypes>) => {
    dispatch({ type: FETCH_DRIVER_TYPES_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_DRIVER_TYPES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.driverTypes}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_DRIVER_TYPES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_DRIVER_TYPES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchDriverStatus = () => {
  return async (dispatch: Dispatch<DriversActionTypes>) => {
    dispatch({ type: FETCH_DRIVER_STATUS_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_DRIVER_STATUS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.driverStatus}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_DRIVER_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_DRIVER_STATUS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addDriver =
  (driverData: CreateDriveType) =>
  async (dispatch: Dispatch<DriversActionTypes>) => {
    dispatch({ type: ADD_DRIVER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.drivers}`;
      const response = await axios.post(url, driverData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create driver");
      }

      dispatch({ type: ADD_DRIVER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_DRIVER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const ResetAddDriverSuccess = (): DriversActionTypes => ({
  type: RESET_ADD_DRIVER_SUCCESS,
});

export const updateDriver =
  (vehicleData: CreateDriveType, id: string) =>
  async (dispatch: Dispatch<DriversActionTypes>) => {
    dispatch({ type: ADD_DRIVER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteDriver,
        {
          id,
        }
      )}`;
      const response = await axios.put(url, vehicleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update driver");
      }

      dispatch({ type: ADD_DRIVER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_DRIVER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const deleteDriver =
  (id: string) => async (dispatch: Dispatch<DriversActionTypes>) => {
    dispatch({ type: DELETE_DRIVER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteDriver,
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
        throw new Error("Failed to delete driver");
      }

      dispatch({ type: DELETE_DRIVER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_DRIVER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const ResetDeleteDriverSuccess = (): DriversActionTypes => ({
  type: RESET_DELETE_DRIVER_SUCCESS,
});
