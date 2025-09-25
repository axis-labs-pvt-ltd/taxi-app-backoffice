import { ThunkDispatch } from "redux-thunk";
import { ToursActionTypes } from "../redux/Tours/ToursReducer";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToursDataType } from "../types/Tours.types";
import useSearch from "./useSearch";
import {
  addTour,
  deleteTour,
  fetchToursPaginated,
  ResetAddTourSuccess,
  ResetDeleteTourSuccess,
  updateTour,
} from "../redux/Tours/ToursAction";
import { Slide, toast } from "react-toastify";
import { ResetStoredImage } from "../redux/Images/ImageAction";
import { ImageActionTypes } from "../redux/Images/ImageReducer";
import useFileUpload from "./useFileUpload";

type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  ToursActionTypes | ImageActionTypes
>;

const useTours = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const { toursPaginated, addTourSuccess, deleteTourSuccess } = useSelector(
    (state: RootState) => state.tours
  );

  const [isAddTourOpen, setIsAddTourOpen] = useState<boolean>(false);
  const [editingTour, setEditingTour] = useState<ToursDataType | undefined>(
    undefined
  );
  const [isDeleteTourOpen, setIsDeleteTourOpen] = useState<boolean>(false);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for tour",
    placeholder: "Search for tour",
  });

  const {
    selectedFiles,
    handleClearImages,
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    imageUrls,
    setImageUrls,
    setSelectedFiles,
  } = useFileUpload();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchToursPaginated({
            pageNumber: currentPage,
            pageSize: 6,
            searchKey,
          })
        );
      }
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, searchKey]);

  useEffect(() => {
    if (!searchKey) {
      dispatch(
        fetchToursPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [dispatch, addTourSuccess.status, deleteTourSuccess.status, searchKey]);

  useEffect(() => {
    if (addTourSuccess.status) {
      toast.success("Tour Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddTourSuccess());
    }
  }, [addTourSuccess.status, dispatch]);

  useEffect(() => {
    if (deleteTourSuccess.status) {
      toast.success("Tour Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteTourSuccess());
    }
  }, [deleteTourSuccess.status, dispatch]);

  const onSubmit = (data: ToursDataType, id?: string) => {
    if (editingTour && id) {
      dispatch(updateTour(data, id));
    } else {
      dispatch(addTour(data));
    }
    setIsAddTourOpen(false);
    dispatch(ResetAddTourSuccess());
    dispatch(ResetStoredImage());
  };

  const handleCancel = () => {
    setIsAddTourOpen(false);
    setEditingTour(undefined);
    setImageUrls([]);
    dispatch(ResetStoredImage());
  };

  const handleTourDelete = async (id: string) => {
    await dispatch(deleteTour(id));
    setIsDeleteTourOpen(false);
  };

  return {
    currentPage,
    toursPaginated,
    SearchInput,
    isAddTourOpen,
    setIsAddTourOpen,
    editingTour,
    setEditingTour,
    onSubmit,
    handleCancel,
    selectedFiles,
    handleClearImages,
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    imageUrls,
    setSelectedFiles,
    isDeleteTourOpen,
    setIsDeleteTourOpen,
    handleTourDelete,
    deleteTourSuccess,
  };
};

export default useTours;
