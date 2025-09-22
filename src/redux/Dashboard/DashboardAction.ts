import { Dispatch } from "react";
import {
  DashboardActionTypes,
  FETCH_MONTHLY_INCOME_FAILURE,
  FETCH_MONTHLY_INCOME_REQUEST,
  FETCH_MONTHLY_INCOME_SUCCESS,
  FETCH_TOTAL_INCOME_FAILURE,
  FETCH_TOTAL_INCOME_REQUEST,
  FETCH_TOTAL_INCOME_SUCCESS,
} from "./DashboardReducer";
import axios from "axios";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import Cookies from "js-cookie";

export const fetchTotalIncome = (startDate: string, endDate: string) => {
  return async (dispatch: Dispatch<DashboardActionTypes>) => {
    dispatch({ type: FETCH_TOTAL_INCOME_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_TOTAL_INCOME_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.totalIncome,
        {
          startDate,
          endDate,
        }
      )}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_TOTAL_INCOME_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TOTAL_INCOME_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchMonthlyIncome = () => {
  return async (dispatch: Dispatch<DashboardActionTypes>) => {
    dispatch({ type: FETCH_MONTHLY_INCOME_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_MONTHLY_INCOME_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.monthlyIncome}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_MONTHLY_INCOME_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MONTHLY_INCOME_FAILURE,
        payload: error.message,
      });
    }
  };
};
