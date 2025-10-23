import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  FETCH_TOUR_INQUIRES_PAGINATED_FAILURE,
  FETCH_TOUR_INQUIRES_PAGINATED_REQUEST,
  FETCH_TOUR_INQUIRES_PAGINATED_SUCCESS,
  TourInquiriesActionTypes,
} from "./TourInquiryReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FETCH_METERS_BY_INQUIRY_FAILURE,
  FETCH_METERS_BY_INQUIRY_REQUEST,
  FETCH_METERS_BY_INQUIRY_SUCCESS,
  InquiriesActionTypes,
  RESET_UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  RESET_UPDATE_DISCOUNT_SUCCESS,
  RESET_UPDATE_INQUIRY_SUCCESS,
  RESET_UPDATE_METER_VALUES_SUCCESS,
  UPDATE_ACTUAL_TOTAL_DISTANCE_FAILURE,
  UPDATE_ACTUAL_TOTAL_DISTANCE_REQUEST,
  UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  UPDATE_DISCOUNT_FAILURE,
  UPDATE_DISCOUNT_REQUEST,
  UPDATE_DISCOUNT_SUCCESS,
  UPDATE_INQUIRY_FAILURE,
  UPDATE_INQUIRY_REQUEST,
  UPDATE_INQUIRY_SUCCESS,
  UPDATE_METER_VALUES_FAILURE,
  UPDATE_METER_VALUES_REQUEST,
  UPDATE_METER_VALUES_SUCCESS,
} from "../Inquiries/InquiriesReducer";
import {
  AssignVehicleType,
  updateActualDistanceType,
  UpdateMeterValuesType,
} from "../../types/Vehicle.types";
import { UpdateDiscountType } from "../../types/Inquiries.types";

export const fetchTourInquiriesPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<TourInquiriesActionTypes>) => {
    dispatch({ type: FETCH_TOUR_INQUIRES_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_TOUR_INQUIRES_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.tourInquiriesPaginated,
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
        type: FETCH_TOUR_INQUIRES_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TOUR_INQUIRES_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const assignVehicleToTourInquiry =
  (Data: AssignVehicleType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_INQUIRY_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.assignVehicleToTourInquiry,
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

export const ResetAssignVehicleToTourInquirySuccess =
  (): InquiriesActionTypes => ({
    type: RESET_UPDATE_INQUIRY_SUCCESS,
  });

export const updateTourTotalDistance =
  (Data: updateActualDistanceType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_ACTUAL_TOTAL_DISTANCE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateTourTotalDistance,
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

export const ResetupdateTourTotalDistanceSuccess =
  (): InquiriesActionTypes => ({
    type: RESET_UPDATE_ACTUAL_TOTAL_DISTANCE_SUCCESS,
  });

export const fetchMetersByTourInquiry = (inquiryId: string) => {
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
        apiRoutes.metersByTourInquiry,
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

export const updateTourInquiryMeterValues =
  (data: UpdateMeterValuesType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_METER_VALUES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateTourInquiryMeterValues,
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

export const ResetupdateTourInquiryMeterValuesSuccess =
  (): InquiriesActionTypes => ({
    type: RESET_UPDATE_METER_VALUES_SUCCESS,
  });

export const updateTourDiscount =
  (data: UpdateDiscountType, inquiryId: string) =>
  async (dispatch: Dispatch<InquiriesActionTypes>) => {
    dispatch({ type: UPDATE_DISCOUNT_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.updateTourDiscount,
        {
          inquiryId,
        }
      )}`;
      const response = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update discount");
      }

      dispatch({ type: UPDATE_DISCOUNT_SUCCESS });
    } catch (error) {
      // Check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        dispatch({
          type: UPDATE_DISCOUNT_FAILURE,
          payload: error.response?.data?.message || error.message,
        });
      } else if (error instanceof Error) {
        dispatch({
          type: UPDATE_DISCOUNT_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: UPDATE_DISCOUNT_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };

export const ResetUpdateTourDiscountSuccess = (): InquiriesActionTypes => ({
  type: RESET_UPDATE_DISCOUNT_SUCCESS,
});
