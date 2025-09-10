import axios from "axios";
import { apiRoutes } from "../../constants/apiRoutes";
import {
  FETCH_VEHICLE_MODELS_FAILURE,
  FETCH_VEHICLE_MODELS_REQUEST,
  FETCH_VEHICLE_MODELS_SUCCESS,
  VehicleModelsActionTypes,
} from "./VehicleModelsReducer";
import API_BASE_URLS from "../../config/api";
import { Dispatch } from "react";
import Cookies from "js-cookie";

export const fetchVehicleModels = () => {
  return async (dispatch: Dispatch<VehicleModelsActionTypes>) => {
    dispatch({ type: FETCH_VEHICLE_MODELS_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_VEHICLE_MODELS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.vehicleModelsEssentials}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_VEHICLE_MODELS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_VEHICLE_MODELS_FAILURE,
        payload: error.message,
      });
    }
  };
};
