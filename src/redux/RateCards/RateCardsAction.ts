import { Dispatch } from "react";
import {
  ADD_RATE_CARD_FAILURE,
  ADD_RATE_CARD_REQUEST,
  ADD_RATE_CARD_SUCCESS,
  DELETE_RATE_CARD_FAILURE,
  DELETE_RATE_CARD_REQUEST,
  DELETE_RATE_CARD_SUCCESS,
  FETCH_RATE_CARDS_FAILURE,
  FETCH_RATE_CARDS_PAGINATED_FAILURE,
  FETCH_RATE_CARDS_PAGINATED_REQUEST,
  FETCH_RATE_CARDS_PAGINATED_SUCCESS,
  FETCH_RATE_CARDS_REQUEST,
  FETCH_RATE_CARDS_SUCCESS,
  RateCardsActionTypes,
  RESET_ADD_RATE_CARD_SUCCESS,
  RESET_DELETE_RATE_CARD_SUCCESS,
} from "./RateCardsReducer";
import API_BASE_URLS from "../../config/api";
import { apiRoutes, generateRoute } from "../../constants/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { PaginationParams } from "../../types/Common.types";
import { RateCardsType } from "../../types/RateCards.types";

export const fetchRateCards = () => {
  return async (dispatch: Dispatch<RateCardsActionTypes>) => {
    dispatch({ type: FETCH_RATE_CARDS_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_RATE_CARDS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.rateCards}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_RATE_CARDS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_RATE_CARDS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchRateCardsPaginated = ({
  pageNumber,
  pageSize,
  searchKey,
}: PaginationParams) => {
  return async (dispatch: Dispatch<RateCardsActionTypes>) => {
    dispatch({ type: FETCH_RATE_CARDS_PAGINATED_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_RATE_CARDS_PAGINATED_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.rateCardsPaginated,
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
        type: FETCH_RATE_CARDS_PAGINATED_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_RATE_CARDS_PAGINATED_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addRateCard =
  (rateCardData: RateCardsType) =>
  async (dispatch: Dispatch<RateCardsActionTypes>) => {
    dispatch({ type: ADD_RATE_CARD_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${apiRoutes.rateCards}`;
      const response = await axios.post(url, rateCardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create rate card");
      }

      dispatch({ type: ADD_RATE_CARD_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_RATE_CARD_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetAddRateCardSuccess = (): RateCardsActionTypes => ({
  type: RESET_ADD_RATE_CARD_SUCCESS,
});

export const updateRateCard =
  (rateCardData: RateCardsType, id: string) =>
  async (dispatch: Dispatch<RateCardsActionTypes>) => {
    dispatch({ type: ADD_RATE_CARD_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteRateCard,
        {
          id,
        }
      )}`;
      const response = await axios.put(url, rateCardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update rate card");
      }

      dispatch({ type: ADD_RATE_CARD_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_RATE_CARD_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const deleteRateCard =
  (id: string) => async (dispatch: Dispatch<RateCardsActionTypes>) => {
    dispatch({ type: DELETE_RATE_CARD_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const url = `${API_BASE_URLS.backendAPI}${generateRoute(
        apiRoutes.editAndDeleteRateCard,
        { id }
      )}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete rate card");
      }

      dispatch({ type: DELETE_RATE_CARD_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DELETE_RATE_CARD_FAILURE,
        payload: error.response?.data?.message,
      });
    }
  };

export const ResetDeleteRateCardSuccess = (): RateCardsActionTypes => ({
  type: RESET_DELETE_RATE_CARD_SUCCESS,
});
