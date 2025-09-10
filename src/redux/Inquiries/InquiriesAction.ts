import { Dispatch } from "react";
import { PaginationParams } from "../../types/Common.types";
import {
  FETCH_INQUIRES_PAGINATED_FAILURE,
  FETCH_INQUIRES_PAGINATED_REQUEST,
  FETCH_INQUIRES_PAGINATED_SUCCESS,
  InquiriesActionTypes,
  RESET_UPDATE_INQUIRY_SUCCESS,
  UPDATE_INQUIRY_FAILURE,
  UPDATE_INQUIRY_REQUEST,
  UPDATE_INQUIRY_SUCCESS,
} from "./InquiriesReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { AssignVehicleType } from "../../types/Vehicle.types";

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
