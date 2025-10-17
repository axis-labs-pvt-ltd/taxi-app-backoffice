import { Dispatch } from "react";
import {
  CLEAR_PROFIT_REPORT,
  FETCH_PROFIT_COST_REPORT_FAILURE,
  FETCH_PROFIT_COST_REPORT_REQUEST,
  FETCH_PROFIT_COST_REPORT_SUCCESS,
  ReportsActionTypes,
} from "./ReportsReducer";
import axios from "axios";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import API_BASE_URLS from "../../config/api";
import Cookies from "js-cookie";

export const fetchProfitReport = (startDate: string, endDate: string) => {
  return async (dispatch: Dispatch<ReportsActionTypes>) => {
    dispatch({ type: FETCH_PROFIT_COST_REPORT_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_PROFIT_COST_REPORT_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.profitReport,
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
        type: FETCH_PROFIT_COST_REPORT_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_PROFIT_COST_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const clearProfitReport = (): ReportsActionTypes => ({
  type: CLEAR_PROFIT_REPORT,
});
