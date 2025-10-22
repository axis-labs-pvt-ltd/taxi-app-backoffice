import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch } from "react";
import API_BASE_URLS from "../../config/api";
import {
  ImageActionTypes,
  RESET_STORED_DAY_IMAGE,
  RESET_STORED_IMAGE,
  UPLOAD_DAY_IMAGE_FAILURE,
  UPLOAD_DAY_IMAGE_REQUEST,
  UPLOAD_DAY_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "./ImageReducer";
import { apiRoutes } from "../../constants/apiRoutes";

export const uploadImage =
  (formData: FormData) => async (dispatch: Dispatch<ImageActionTypes>) => {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.files}`;
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: response.data, // contains { success, message, filename, url }
      });
    } catch (error: any) {
      dispatch({
        type: UPLOAD_IMAGE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
export const ResetStoredImage = (): ImageActionTypes => ({
  type: RESET_STORED_IMAGE,
});

export const uploadDayImage =
  (formData: FormData) => async (dispatch: Dispatch<ImageActionTypes>) => {
    dispatch({ type: UPLOAD_DAY_IMAGE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.files}`;
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const payload = response.data;

      dispatch({
        type: UPLOAD_DAY_IMAGE_SUCCESS,
        payload,
      });

      // ✅ Return payload for direct access in component
      return { success: true, payload };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: UPLOAD_DAY_IMAGE_FAILURE,
        payload: errorMessage,
      });

      throw new Error(errorMessage);
    }
  };

export const ResetStoredDayImage = (): ImageActionTypes => ({
  type: RESET_STORED_DAY_IMAGE,
});
