import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  ADD_EXTRASERVICE_FAILURE,
  ADD_EXTRASERVICE_REQUEST,
  ADD_EXTRASERVICE_SUCCESS,
  DELETE_EXTRASERVICE_FAILURE,
  DELETE_EXTRASERVICE_REQUEST,
  DELETE_EXTRASERVICE_SUCCESS,
  ExtraServiceActionTypes,
  FETCH_EXTRASERVICES_PAGINATED_FAILURE,
  FETCH_EXTRASERVICES_PAGINATED_REQUEST,
  FETCH_EXTRASERVICES_PAGINATED_SUCCESS,
  RESET_ADD_EXTRASERVICE_SUCCESS,
  RESET_DELETE_EXTRASERVICE_SUCCESS,
} from "./ExtraServicesReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { CreateExtraServiceType } from "../../types/ExtraServices.types";

export const fetchExtraServicesPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<ExtraServiceActionTypes>) => {
    dispatch({ type: FETCH_EXTRASERVICES_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_EXTRASERVICES_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.extraServicesPaginated,
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
        type: FETCH_EXTRASERVICES_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_EXTRASERVICES_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addExtraService =
  (serviceData: CreateExtraServiceType) =>
  async (dispatch: Dispatch<ExtraServiceActionTypes>) => {
    dispatch({ type: ADD_EXTRASERVICE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.extraServices}`;
      const response = await axios.post(url, serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create service");
      }

      dispatch({ type: ADD_EXTRASERVICE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_EXTRASERVICE_FAILURE,
        payload: error.message,
      });
    }
  };

export const ResetAddExtraServiceSuccess = (): ExtraServiceActionTypes => ({
  type: RESET_ADD_EXTRASERVICE_SUCCESS,
});

export const updateService =
  (vehicleData: CreateExtraServiceType, id: string) =>
  async (dispatch: Dispatch<ExtraServiceActionTypes>) => {
    dispatch({ type: ADD_EXTRASERVICE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteExtraService,
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
        throw new Error("Failed to update service");
      }

      dispatch({ type: ADD_EXTRASERVICE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_EXTRASERVICE_FAILURE,
        payload: error.message,
      });
    }
  };

export const deleteExtraService =
  (id: string) => async (dispatch: Dispatch<ExtraServiceActionTypes>) => {
    dispatch({ type: DELETE_EXTRASERVICE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteExtraService,
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
        throw new Error("Failed to delete service");
      }

      dispatch({ type: DELETE_EXTRASERVICE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_EXTRASERVICE_FAILURE,
        payload: error.message,
      });
    }
  };

export const ResetDeleteExtraServiceSuccess = (): ExtraServiceActionTypes => ({
  type: RESET_DELETE_EXTRASERVICE_SUCCESS,
});
