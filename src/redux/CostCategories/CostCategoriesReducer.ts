import { CostCategoriesType } from "../../types/CostCategory.types";
import { ReduxState } from "../../types/Redux.types";

export const FETCH_COST_CATEGORIES_REQUEST = "FETCH_COST_CATEGORIES_REQUEST";
export const FETCH_COST_CATEGORIES_SUCCESS = "FETCH_COST_CATEGORIES_SUCCESS";
export const FETCH_COST_CATEGORIES_FAILURE = "FETCH_COST_CATEGORIES_FAILURE";

interface CostCategoryState {
  loading: boolean;
  costCategories: ReduxState<CostCategoriesType[] | null>;
}

const initialState: CostCategoryState = {
  loading: false,
  costCategories: { data: null, loading: false, error: null },
};

interface FetchCostCategoriesRequestAction {
  type: typeof FETCH_COST_CATEGORIES_REQUEST;
}

interface FetchCostCategoriesSuccessAction {
  type: typeof FETCH_COST_CATEGORIES_SUCCESS;
  payload: CostCategoriesType[];
}

interface FetchCostCategoriesFailureAction {
  type: typeof FETCH_COST_CATEGORIES_FAILURE;
  payload: string;
}

export type CostCategoriesActionTypes =
  | FetchCostCategoriesRequestAction
  | FetchCostCategoriesSuccessAction
  | FetchCostCategoriesFailureAction;

const costCategoriesReducer = (
  state = initialState,
  action: CostCategoriesActionTypes
): CostCategoryState => {
  switch (action.type) {
    case FETCH_COST_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        costCategories: { data: null, error: null, loading: true },
      };
    case FETCH_COST_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        costCategories: {
          data: action.payload,
          error: null,
          loading: false,
        },
      };
    case FETCH_COST_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        costCategories: {
          data: null,
          error: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default costCategoriesReducer;
