import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  ADD_TOUR_FAILURE,
  ADD_TOUR_REQUEST,
  ADD_TOUR_SUCCESS,
  DELETE_TOUR_FAILURE,
  DELETE_TOUR_REQUEST,
  DELETE_TOUR_SUCCESS,
  FETCH_TOURS_PAGINATED_FAILURE,
  FETCH_TOURS_PAGINATED_REQUEST,
  FETCH_TOURS_PAGINATED_SUCCESS,
  RESET_ADD_TOUR_SUCCESS,
  RESET_DELETE_TOUR_SUCCESS,
  ToursActionTypes,
} from "./ToursReducer";
import axios from "axios";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import Cookies from "js-cookie";
import { ToursDataType } from "../../types/Tours.types";

export const fetchToursPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<ToursActionTypes>) => {
    dispatch({ type: FETCH_TOURS_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_TOURS_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.toursPaginated,
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
        type: FETCH_TOURS_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TOURS_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addTour =
  (tourData: ToursDataType) => async (dispatch: Dispatch<ToursActionTypes>) => {
    dispatch({ type: ADD_TOUR_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.tours}`;
      const response = await axios.post(url, tourData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create tour");
      }

      dispatch({ type: ADD_TOUR_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_TOUR_FAILURE,
        payload: error.message,
      });
    }
  };

export const ResetAddTourSuccess = (): ToursActionTypes => ({
  type: RESET_ADD_TOUR_SUCCESS,
});

export const updateTour =
  (tourData: ToursDataType, id: string) =>
  async (dispatch: Dispatch<ToursActionTypes>) => {
    dispatch({ type: ADD_TOUR_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteTour,
        {
          id,
        }
      )}`;
      const response = await axios.put(url, tourData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update tour");
      }

      dispatch({ type: ADD_TOUR_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_TOUR_FAILURE,
        payload: error.message,
      });
    }
  };

export const deleteTour =
  (id: string) => async (dispatch: Dispatch<ToursActionTypes>) => {
    dispatch({ type: DELETE_TOUR_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteTour,
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
        throw new Error("Failed to delete tour");
      }

      dispatch({ type: DELETE_TOUR_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_TOUR_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetDeleteTourSuccess = (): ToursActionTypes => ({
  type: RESET_DELETE_TOUR_SUCCESS,
});
