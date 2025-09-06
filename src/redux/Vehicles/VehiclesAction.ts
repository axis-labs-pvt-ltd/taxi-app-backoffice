import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  ADD_VEHICLE_FAILURE,
  ADD_VEHICLE_REQUEST,
  ADD_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILURE,
  DELETE_VEHICLE_REQUEST,
  DELETE_VEHICLE_SUCCESS,
  FETCH_VEHICLE_TYPES_FAILURE,
  FETCH_VEHICLE_TYPES_REQUEST,
  FETCH_VEHICLE_TYPES_SUCCESS,
  FETCH_VEHICLES_PAGINATED_FAILURE,
  FETCH_VEHICLES_PAGINATED_REQUEST,
  FETCH_VEHICLES_PAGINATED_SUCCESS,
  RESET_ADD_VEHICLE_SUCCESS,
  RESET_DELETE_VEHICLE_SUCCESS,
  VehiclesActionTypes,
} from "./VehiclesReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { CreateVehicleType } from "../../types/Vehicle.types";

export const fetchVehiclesPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<VehiclesActionTypes>) => {
    dispatch({ type: FETCH_VEHICLES_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_VEHICLES_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.vehiclesPaginated,
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
        type: FETCH_VEHICLES_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_VEHICLES_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchVehicleTypes = () => {
  return async (dispatch: Dispatch<VehiclesActionTypes>) => {
    dispatch({ type: FETCH_VEHICLE_TYPES_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_VEHICLE_TYPES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.vehicleTypes}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_VEHICLE_TYPES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_VEHICLE_TYPES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addVehicle =
  (vehicleData: CreateVehicleType) =>
  async (dispatch: Dispatch<VehiclesActionTypes>) => {
    dispatch({ type: ADD_VEHICLE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.vehicles}`;
      const response = await axios.post(url, vehicleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create vehicle");
      }

      dispatch({ type: ADD_VEHICLE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_VEHICLE_FAILURE,
        payload: error.message,
      });
    }
  };

export const ResetAddVehicleSuccess = (): VehiclesActionTypes => ({
  type: RESET_ADD_VEHICLE_SUCCESS,
});

export const updateVehicle =
  (vehicleData: CreateVehicleType, id: string) =>
  async (dispatch: Dispatch<VehiclesActionTypes>) => {
    dispatch({ type: ADD_VEHICLE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteVehicle,
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
        throw new Error("Failed to update vehicle");
      }

      dispatch({ type: ADD_VEHICLE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_VEHICLE_FAILURE,
        payload: error.message,
      });
    }
  };

export const deleteVehicle =
  (id: string) => async (dispatch: Dispatch<VehiclesActionTypes>) => {
    dispatch({ type: DELETE_VEHICLE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteVehicle,
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
        throw new Error("Failed to delete vehicle");
      }

      dispatch({ type: DELETE_VEHICLE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_VEHICLE_FAILURE,
        payload: error.message,
      });
    }
  };

export const ResetDeleteVehicleSuccess = (): VehiclesActionTypes => ({
  type: RESET_DELETE_VEHICLE_SUCCESS,
});
