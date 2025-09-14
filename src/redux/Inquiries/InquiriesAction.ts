import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  FETCH_INQUIRES_PAGINATED_FAILURE,
  FETCH_INQUIRES_PAGINATED_REQUEST,
  FETCH_INQUIRES_PAGINATED_SUCCESS,
  InquiriesActionTypes,
  RESET_UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  RESET_UPDATE_INQUIRY_STATUS_SUCCESS,
  RESET_UPDATE_INQUIRY_SUCCESS,
  UPDATE_ACTUAL_TOTAL_DISTANCE_FAILURE,
  UPDATE_ACTUAL_TOTAL_DISTANCE_REQUEST,
  UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  UPDATE_INQUIRY_FAILURE,
  UPDATE_INQUIRY_REQUEST,
  UPDATE_INQUIRY_STATUS_FAILURE,
  UPDATE_INQUIRY_STATUS_REQUEST,
  UPDATE_INQUIRY_STATUS_SUCCESS,
  UPDATE_INQUIRY_SUCCESS,
} from "./InquiriesReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import {
  AssignVehicleType,
  updateActualDistanceType,
  UpdateInquiryStatusType,
} from "../../types/Vehicle.types";

export const fetchInquiriesPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: FETCH_INQUIRES_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_INQUIRES_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.inquiriesPaginated,
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
        type: FETCH_INQUIRES_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_INQUIRES_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Assign vehicle to a inquiry
export const updateInquiry =
  (Data: AssignVehicleType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_INQUIRY_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.assignVehicleToInquiry,
        {
          inquiryId,
        }
      )}`;
      const response = await axios.put(url, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create inquiry");
      }

      dispatch({ type: UPDATE_INQUIRY_SUCCESS });
    } catch (error) {
      // Check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        dispatch({
          type: UPDATE_INQUIRY_FAILURE,
          payload: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        dispatch({
          type: UPDATE_INQUIRY_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: UPDATE_INQUIRY_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };

export const ResetupdateInquirySuccess = (): InquiriesActionTypes => ({
  type: RESET_UPDATE_INQUIRY_SUCCESS,
});

export const updateActualTotalDistance =
  (Data: updateActualDistanceType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_ACTUAL_TOTAL_DISTANCE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateActualDiatnace,
        {
          inquiryId,
        }
      )}`;
      const response = await axios.put(url, Data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update actual distance");
      }

      dispatch({ type: UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS });
    } catch (error) {
      // Check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        dispatch({
          type: UPDATE_ACTUAL_TOTAL_DISTANCE_FAILURE,
          payload: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        dispatch({
          type: UPDATE_ACTUAL_TOTAL_DISTANCE_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: UPDATE_ACTUAL_TOTAL_DISTANCE_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };

export const ResetupdateActualTotalDistanceSuccess =
  (): InquiriesActionTypes => ({
    type: RESET_UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  });

export const updateInquiryStatus =
  (data: UpdateInquiryStatusType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_INQUIRY_STATUS_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateInquiryStatus,
        {
          inquiryId,
        }
      )}`;
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update inquiry status");
      }

      dispatch({ type: UPDATE_INQUIRY_STATUS_SUCCESS });
    } catch (error) {
      // Check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        dispatch({
          type: UPDATE_INQUIRY_STATUS_FAILURE,
          payload: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        dispatch({
          type: UPDATE_INQUIRY_STATUS_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: UPDATE_INQUIRY_STATUS_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };

export const ResetupdateInquiryStatusSuccess = (): InquiriesActionTypes => ({
  type: RESET_UPDATE_INQUIRY_STATUS_SUCCESS,
});
