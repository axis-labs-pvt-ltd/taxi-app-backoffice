import { ImageUrlType } from "../../types/Common.types";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
export const RESET_STORED_IMAGE = "RESET_STORED_IMAGE";
export const UPLOAD_DAY_IMAGE_REQUEST = "UPLOAD_DAY_IMAGE_REQUEST";
export const UPLOAD_DAY_IMAGE_SUCCESS = "UPLOAD_DAY_IMAGE_SUCCESS";
export const UPLOAD_DAY_IMAGE_FAILURE = "UPLOAD_DAY_IMAGE_FAILURE";
export const RESET_STORED_DAY_IMAGE = "RESET_STORED_DAY_IMAGE";

interface ImageState {
  uploading: boolean;
  imageUrl: ImageUrlType | null;
  dayImageUrl: ImageUrlType | null;
  error: string | null;
}

const initialState: ImageState = {
  uploading: false,
  imageUrl: null,
  dayImageUrl: null,
  error: null,
};

interface UploadImageRequestAction {
  type: typeof UPLOAD_IMAGE_REQUEST;
}

interface UploadImageSuccessAction {
  type: typeof UPLOAD_IMAGE_SUCCESS;
  payload: ImageUrlType;
}

interface UploadImageFailureAction {
  type: typeof UPLOAD_IMAGE_FAILURE;
  payload: string;
}

interface ResetStoredImageAction {
  type: typeof RESET_STORED_IMAGE;
}

interface UploadDayImageRequestAction {
  type: typeof UPLOAD_DAY_IMAGE_REQUEST;
}

interface UploadDayImageSuccessAction {
  type: typeof UPLOAD_DAY_IMAGE_SUCCESS;
  payload: ImageUrlType;
}

interface UploadDayImageFailureAction {
  type: typeof UPLOAD_DAY_IMAGE_FAILURE;
  payload: string;
}

interface ResetStoredDayImageAction {
  type: typeof RESET_STORED_DAY_IMAGE;
}

export type ImageActionTypes =
  | UploadImageRequestAction
  | UploadImageSuccessAction
  | UploadImageFailureAction
  | ResetStoredImageAction
  | UploadDayImageRequestAction
  | UploadDayImageSuccessAction
  | UploadDayImageFailureAction
  | ResetStoredDayImageAction;

const imageReducer = (
  state = initialState,
  action: ImageActionTypes
): ImageState => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { ...state, uploading: true, error: null };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploading: false,
        imageUrl: action.payload,
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload,
      };

    case RESET_STORED_IMAGE:
      return {
        ...state,
        uploading: false,
        imageUrl: null,
      };

    case UPLOAD_DAY_IMAGE_REQUEST:
      return { ...state, uploading: true, error: null };
    case UPLOAD_DAY_IMAGE_SUCCESS:
      return {
        ...state,
        uploading: false,
        dayImageUrl: action.payload,
      };
    case UPLOAD_DAY_IMAGE_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload,
      };

    case RESET_STORED_DAY_IMAGE:
      return {
        ...state,
        uploading: false,
        dayImageUrl: null,
      };

    default:
      return state;
  }
};

export default imageReducer;
