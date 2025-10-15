import axios from "axios";
import {
  CostCategoriesActionTypes,
  FETCH_COST_CATEGORIES_FAILURE,
  FETCH_COST_CATEGORIES_REQUEST,
  FETCH_COST_CATEGORIES_SUCCESS,
} from "./CostCategoriesReducer";
import API_BASE_URLS from "../../config/api";
import { Dispatch } from "react";
import { apiRoutes } from "../../constants/apiRoutes";
import Cookies from "js-cookie";

export const fetchCostCategories = () => {
  return async (dispatch: Dispatch<CostCategoriesActionTypes>) => {
    dispatch({ type: FETCH_COST_CATEGORIES_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_COST_CATEGORIES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.costCategories}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_COST_CATEGORIES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_COST_CATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  };
};
