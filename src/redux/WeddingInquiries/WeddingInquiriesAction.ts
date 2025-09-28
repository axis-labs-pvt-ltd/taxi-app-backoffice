import axios from "axios";
import { PaginationParams } from "../../types/Common.types";
import {
  FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE,
  FETCH_WEDDING_INQUIRES_PAGINATED_REQUEST,
  FETCH_WEDDING_INQUIRES_PAGINATED_SUCCESS,
  WeddingInquiriesActionTypes,
} from "./WeddingInquiriesReducer";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import API_BASE_URLS from "../../config/api";
import { Dispatch } from "react";
import Cookies from "js-cookie";
import {
  AssignVehicleType,
  updateActualDistanceType,
  UpdateInquiryStatusType,
  UpdateMeterValuesType,
} from "../../types/Vehicle.types";
import {
  FETCH_METERS_BY_INQUIRY_FAILURE,
  FETCH_METERS_BY_INQUIRY_REQUEST,
  FETCH_METERS_BY_INQUIRY_SUCCESS,
  InquiriesActionTypes,
  RESET_UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  RESET_UPDATE_INQUIRY_STATUS_SUCCESS,
  RESET_UPDATE_INQUIRY_SUCCESS,
  RESET_UPDATE_METER_VALUES_SUCCESS,
  UPDATE_ACTUAL_TOTAL_DISTANCE_FAILURE,
  UPDATE_ACTUAL_TOTAL_DISTANCE_REQUEST,
  UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  UPDATE_INQUIRY_FAILURE,
  UPDATE_INQUIRY_REQUEST,
  UPDATE_INQUIRY_STATUS_FAILURE,
  UPDATE_INQUIRY_STATUS_REQUEST,
  UPDATE_INQUIRY_STATUS_SUCCESS,
  UPDATE_INQUIRY_SUCCESS,
  UPDATE_METER_VALUES_FAILURE,
  UPDATE_METER_VALUES_REQUEST,
  UPDATE_METER_VALUES_SUCCESS,
} from "../Inquiries/InquiriesReducer";

export const fetchWeddingInquiriesPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<WeddingInquiriesActionTypes>) => {
    dispatch({ type: FETCH_WEDDING_INQUIRES_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.weddingInquiriesPaginated,
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
        type: FETCH_WEDDING_INQUIRES_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_WEDDING_INQUIRES_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const assignVeicleToWeddingInquiry =
  (Data: AssignVehicleType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_INQUIRY_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.assignVehicleToWeddingInquiry,
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
        throw new Error("Failed to assign vehicle");
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

export const ResetAssignVehicleSuccess = (): InquiriesActionTypes => ({
  type: RESET_UPDATE_INQUIRY_SUCCESS,
});

export const updateTotalDistance =
  (Data: updateActualDistanceType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_ACTUAL_TOTAL_DISTANCE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateTotalDistance,
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

export const ResetupdateTotalDistanceSuccess = (): InquiriesActionTypes => ({
  type: RESET_UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
});

export const updateWeddingInquiryMeterValues =
  (data: UpdateMeterValuesType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_METER_VALUES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateWeddingInquiryMeterValues,
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
        throw new Error("Failed to update meter values");
      }

      dispatch({ type: UPDATE_METER_VALUES_SUCCESS });
    } catch (error) {
      // Check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        dispatch({
          type: UPDATE_METER_VALUES_FAILURE,
          payload: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        dispatch({
          type: UPDATE_METER_VALUES_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: UPDATE_METER_VALUES_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };

export const ResetupdateWeddingInquiryMeterValuesSuccess =
  (): InquiriesActionTypes => ({
    type: RESET_UPDATE_METER_VALUES_SUCCESS,
  });

export const fetchMetersByWeddingInquiry = (inquiryId: string) => {
  return async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: FETCH_METERS_BY_INQUIRY_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_METERS_BY_INQUIRY_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.metersByWeddingInquiry,
        {
          inquiryId,
        }
      )}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_METERS_BY_INQUIRY_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_METERS_BY_INQUIRY_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateWeddingInquiryStatus =
  (data: UpdateInquiryStatusType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_INQUIRY_STATUS_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateWeddingInquiryStatus,
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

export const ResetupdateWeddingInquiryStatusSuccess =
  (): InquiriesActionTypes => ({
    type: RESET_UPDATE_INQUIRY_STATUS_SUCCESS,
  });
