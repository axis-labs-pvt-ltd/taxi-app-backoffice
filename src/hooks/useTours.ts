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
  fetchToursPaginated,
  ResetAddTourSuccess,
  updateTour,
} from "../redux/Tours/ToursAction";
import { Slide, toast } from "react-toastify";
import { ResetStoredImage } from "../redux/Images/ImageAction";
import { ImageActionTypes } from "../redux/Images/ImageReducer";

type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  ToursActionTypes | ImageActionTypes
>;

const useTours = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const { toursPaginated, addTourSuccess } = useSelector(
    (state: RootState) => state.tours
  );

  const [isAddTourOpen, setIsAddTourOpen] = useState<boolean>(false);
  const [editingTour, setEditingTour] = useState<ToursDataType | undefined>(
    undefined
  );
  // const [isDeleteUserOpen, setIsDeleteUserOpen] = useState<boolean>(false);
  // const [isResetPasswordOpen, setIsResetPasswordOpen] =
  //   useState<boolean>(false);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for tour",
    placeholder: "Search for tour",
  });

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
  }, [
    dispatch,
    addTourSuccess.status,
    // deleteUserSuccess.status,
    searchKey,
  ]);

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

  return {
    currentPage,
    toursPaginated,
    SearchInput,
    isAddTourOpen,
    setIsAddTourOpen,
    editingTour,
    setEditingTour,
    onSubmit,
  };
};

export default useTours;
