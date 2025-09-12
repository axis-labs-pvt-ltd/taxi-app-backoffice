import {
  RateCardPaginatedType,
  RateCardsType,
} from "../../types/RateCards.types";
import { ReduxState, ReduxStatus } from "../../types/Redux.types";

export const FETCH_RATE_CARDS_REQUEST = "FETCH_RATE_CARDS_REQUEST";
export const FETCH_RATE_CARDS_SUCCESS = "FETCH_RATE_CARDS_SUCCESS";
export const FETCH_RATE_CARDS_FAILURE = "FETCH_RATE_CARDS_FAILURE";
export const FETCH_RATE_CARDS_PAGINATED_REQUEST =
  "FETCH_RATE_CARDS_PAGINATED_REQUEST";
export const FETCH_RATE_CARDS_PAGINATED_SUCCESS =
  "FETCH_RATE_CARDS_PAGINATED_SUCCESS";
export const FETCH_RATE_CARDS_PAGINATED_FAILURE =
  "FETCH_RATE_CARDS_PAGINATED_FAILURE";
export const ADD_RATE_CARD_REQUEST = "ADD_RATE_CARD_REQUEST";
export const ADD_RATE_CARD_SUCCESS = "ADD_RATE_CARD_SUCCESS";
export const ADD_RATE_CARD_FAILURE = "ADD_RATE_CARD_FAILURE";
export const RESET_ADD_RATE_CARD_SUCCESS = "RESET_ADD_RATE_CARD_SUCCESS";
export const DELETE_RATE_CARD_REQUEST = "DELETE_RATE_CARD_REQUEST";
export const DELETE_RATE_CARD_SUCCESS = "DELETE_RATE_CARD_SUCCESS";
export const DELETE_RATE_CARD_FAILURE = "DELETE_RATE_CARD_FAILURE";
export const RESET_DELETE_RATE_CARD_SUCCESS = "RESET_DELETE_RATE_CARD_SUCCESS";

interface RateCardState {
  loading: boolean;
  rateCards: ReduxState<RateCardsType[] | null>;
  rateCardsPaginated: ReduxState<RateCardPaginatedType | null>;
  addRateCardSuccess: ReduxStatus;
  deleteRateCardSuccess: ReduxStatus;
}

const initialState: RateCardState = {
  loading: false,
  rateCards: { data: null, loading: false, error: null },
  rateCardsPaginated: { data: null, loading: false, error: null },
  addRateCardSuccess: { status: false, loading: false, error: null },
  deleteRateCardSuccess: { status: false, loading: false, error: null },
};

interface FetchRateCardsRequestAction {
  type: typeof FETCH_RATE_CARDS_REQUEST;
}

interface FetchRateCardsSuccessAction {
  type: typeof FETCH_RATE_CARDS_SUCCESS;
  payload: RateCardsType[];
}

interface FetchRateCardsFailureAction {
  type: typeof FETCH_RATE_CARDS_FAILURE;
  payload: string;
}

interface FetchRateCardsPaginatedRequestAction {
  type: typeof FETCH_RATE_CARDS_PAGINATED_REQUEST;
}

interface FetchRateCardsPaginatedSuccessAction {
  type: typeof FETCH_RATE_CARDS_PAGINATED_SUCCESS;
  payload: RateCardPaginatedType;
}

interface FetchRateCardsPaginatedFailureAction {
  type: typeof FETCH_RATE_CARDS_PAGINATED_FAILURE;
  payload: string;
}

interface AddRateCardsRequestAction {
  type: typeof ADD_RATE_CARD_REQUEST;
}

interface AddRateCardsSuccessAction {
  type: typeof ADD_RATE_CARD_SUCCESS;
}

interface AddRateCardsFailureAction {
  type: typeof ADD_RATE_CARD_FAILURE;
  payload: string;
}

interface ResetAddRateCardsSuccessAction {
  type: typeof RESET_ADD_RATE_CARD_SUCCESS;
}

interface DeleteRateCardsRequestAction {
  type: typeof DELETE_RATE_CARD_REQUEST;
}

interface DeleteRateCardsSuccessAction {
  type: typeof DELETE_RATE_CARD_SUCCESS;
}

interface DeleteRateCardsFailureAction {
  type: typeof DELETE_RATE_CARD_FAILURE;
  payload: string;
}

interface ResetDeleteRateCardsSuccessAction {
  type: typeof RESET_DELETE_RATE_CARD_SUCCESS;
}

export type RateCardsActionTypes =
  | FetchRateCardsRequestAction
  | FetchRateCardsSuccessAction
  | FetchRateCardsFailureAction
  | FetchRateCardsPaginatedRequestAction
  | FetchRateCardsPaginatedSuccessAction
  | FetchRateCardsPaginatedFailureAction
  | AddRateCardsRequestAction
  | AddRateCardsSuccessAction
  | AddRateCardsFailureAction
  | ResetAddRateCardsSuccessAction
  | DeleteRateCardsRequestAction
  | DeleteRateCardsSuccessAction
  | DeleteRateCardsFailureAction
  | ResetDeleteRateCardsSuccessAction;

const rateCardsReducer = (
  state = initialState,
  action: RateCardsActionTypes
): RateCardState => {
  switch (action.type) {
    case FETCH_RATE_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        rateCards: { data: null, error: null, loading: true },
      };
    case FETCH_RATE_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        rateCards: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_RATE_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        rateCards: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case FETCH_RATE_CARDS_PAGINATED_REQUEST:
      return {
        ...state,
        loading: true,
        rateCardsPaginated: { data: null, error: null, loading: true },
      };
    case FETCH_RATE_CARDS_PAGINATED_SUCCESS:
      return {
        ...state,
        loading: false,
        rateCardsPaginated: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_RATE_CARDS_PAGINATED_FAILURE:
      return {
        ...state,
        loading: false,
        rateCardsPaginated: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    case ADD_RATE_CARD_REQUEST:
      return {
        ...state,
        loading: true,
        addRateCardSuccess: { status: false, error: null, loading: true },
      };
    case ADD_RATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        addRateCardSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case ADD_RATE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        addRateCardSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_ADD_RATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        addRateCardSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    case DELETE_RATE_CARD_REQUEST:
      return {
        ...state,
        loading: true,
        deleteRateCardSuccess: { status: false, error: null, loading: true },
      };
    case DELETE_RATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteRateCardSuccess: {
          status: true,
          error: null,
          loading: false,
        },
      };
    case DELETE_RATE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        deleteRateCardSuccess: {
          status: false,
          error: action.payload,
          loading: false,
        },
      };

    case RESET_DELETE_RATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteRateCardSuccess: {
          status: false,
          error: null,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default rateCardsReducer;
