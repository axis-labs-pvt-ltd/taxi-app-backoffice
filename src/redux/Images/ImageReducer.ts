import { ImageUrlType } from "../../types/Common.types";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
export const RESET_STORED_IMAGE = "RESET_STORED_IMAGE";

interface ImageState {
  uploading: boolean;
  imageUrl: ImageUrlType | null;
  error: string | null;
}

const initialState: ImageState = {
  uploading: false,
  imageUrl: null,
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

export type ImageActionTypes =
  | UploadImageRequestAction
  | UploadImageSuccessAction
  | UploadImageFailureAction
  | ResetStoredImageAction;

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
        imageUrl: null,
      };

    default:
      return state;
  }
};

export default imageReducer;
