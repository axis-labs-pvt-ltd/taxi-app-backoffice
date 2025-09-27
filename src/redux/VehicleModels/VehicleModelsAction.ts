import axios from "axios";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import {
  ADD_VEHICLE_MODEL_FAILURE,
  ADD_VEHICLE_MODEL_REQUEST,
  ADD_VEHICLE_MODEL_SUCCESS,
  DELETE_VEHICLE_MODEL_FAILURE,
  DELETE_VEHICLE_MODEL_REQUEST,
  DELETE_VEHICLE_MODEL_SUCCESS,
  FETCH_VEHICLE_MODELS_FAILURE,
  FETCH_VEHICLE_MODELS_PAGINATED_FAILURE,
  FETCH_VEHICLE_MODELS_PAGINATED_REQUEST,
  FETCH_VEHICLE_MODELS_PAGINATED_SUCCESS,
  FETCH_VEHICLE_MODELS_REQUEST,
  FETCH_VEHICLE_MODELS_SUCCESS,
  RESET_ADD_VEHICLE_MODEL_SUCCESS,
  RESET_DELETE_VEHICLE_MODEL_SUCCESS,
  VehicleModelsActionTypes,
} from "./VehicleModelsReducer";
import API_BASE_URLS from "../../config/api";
import { Dispatch } from "react";
import Cookies from "js-cookie";
import { PaginationParams } from "../../types/Common.types";
import { CreateVehicleModelType } from "../../types/VehicleModels.types";

export const fetchVehicleModels = () => {
  return async (dispatch: Dispatch<VehicleModelsActionTypes>) => {
    dispatch({ type: FETCH_VEHICLE_MODELS_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_VEHICLE_MODELS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.vehicleModelsEssentials}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_VEHICLE_MODELS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_VEHICLE_MODELS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchVehicleModelsPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<VehicleModelsActionTypes>) => {
    dispatch({ type: FETCH_VEHICLE_MODELS_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_VEHICLE_MODELS_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.vehicleModelsPaginated,
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
        type: FETCH_VEHICLE_MODELS_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_VEHICLE_MODELS_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addVehicleModel =
  (vehicleModelData: CreateVehicleModelType) =>
  async (dispatch: Dispatch<VehicleModelsActionTypes>) => {
    dispatch({ type: ADD_VEHICLE_MODEL_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.vehicleModels}`;
      const response = await axios.post(url, vehicleModelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create vehicle model");
      }

      dispatch({ type: ADD_VEHICLE_MODEL_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_VEHICLE_MODEL_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetAddVehicleModelSuccess = (): VehicleModelsActionTypes => ({
  type: RESET_ADD_VEHICLE_MODEL_SUCCESS,
});

export const updateVehicleModel =
  (vehicleModelData: CreateVehicleModelType, id: string) =>
  async (dispatch: Dispatch<VehicleModelsActionTypes>) => {
    dispatch({ type: ADD_VEHICLE_MODEL_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateAndDeleteVehicleModel,
        { id }
      )}`;
      const response = await axios.put(url, vehicleModelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update vehicle model");
      }

      dispatch({ type: ADD_VEHICLE_MODEL_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_VEHICLE_MODEL_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const deleteVehicleModel =
  (id: string) => async (dispatch: Dispatch<VehicleModelsActionTypes>) => {
    dispatch({ type: DELETE_VEHICLE_MODEL_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateAndDeleteVehicleModel,
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
        throw new Error("Failed to delete vehicle model");
      }

      dispatch({ type: DELETE_VEHICLE_MODEL_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_VEHICLE_MODEL_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetDeleteVehicleModelSuccess = (): VehicleModelsActionTypes => ({
  type: RESET_DELETE_VEHICLE_MODEL_SUCCESS,
});
