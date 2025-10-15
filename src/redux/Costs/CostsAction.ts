import axios from "axios";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import {
  ADD_COSTS_FAILURE,
  ADD_COSTS_REQUEST,
  ADD_COSTS_SUCCESS,
  CostsActionTypes,
  FETCH_COSTS_BY_INQUIRY_ID_FAILURE,
  FETCH_COSTS_BY_INQUIRY_ID_REQUEST,
  FETCH_COSTS_BY_INQUIRY_ID_SUCCESS,
  RESET_ADD_COSTS_SUCCESS,
} from "./CostsReducer";
import Cookies from "js-cookie";
import { Dispatch } from "react";
import { AddCostsType } from "../../types/CostCategory.types";

export const addCosts =
  (costsData: AddCostsType) => async (dispatch: Dispatch<CostsActionTypes>) => {
    dispatch({ type: ADD_COSTS_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.costs}`;
      const response = await axios.post(url, costsData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to add costs");
      }

      dispatch({ type: ADD_COSTS_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_COSTS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const ResetAddCostsSuccess = (): CostsActionTypes => ({
  type: RESET_ADD_COSTS_SUCCESS,
});

export const fetchCostsByInquiryId = (inquiryId: string) => {
  return async (dispatch: Dispatch<CostsActionTypes>) => {
    dispatch({ type: FETCH_COSTS_BY_INQUIRY_ID_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_COSTS_BY_INQUIRY_ID_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.costsByInquiryId,
        { inquiryId }
      )}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_COSTS_BY_INQUIRY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_COSTS_BY_INQUIRY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};
