import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { DriversActionTypes } from "../redux/Drivers/DriversReducer";
import {
  addDriver,
  deleteDriver,
  fetchDriversPaginated,
  fetchDriverStatus,
  fetchDriverTypes,
  ResetAddDriverSuccess,
  ResetDeleteDriverSuccess,
  updateDriver,
} from "../redux/Drivers/DriversAction";
import { useEffect, useState } from "react";
import useSearch from "./useSearch";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CreateDriveType,
  DriversPaginatedDataType,
} from "../types/Drivers.types";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, DriversActionTypes>;

const useDrivers = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    driversPaginated,
    driverStatus,
    driverTypes,
    addDriverSuccess,
    deleteDriverSuccess,
  } = useSelector((state: RootState) => state.drivers);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for service",
    placeholder: "Search for service",
  });
  const [isAddDriverOpen, setIsAddDriverOpen] = useState<boolean>(false);
  const [editingDriver, setEditingDriver] = useState<
    DriversPaginatedDataType | undefined
  >(undefined);
  const [isDeleteDriverOpen, setIsDeleteDriverOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchDriversPaginated({
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
        fetchDriversPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [
    dispatch,
    addDriverSuccess.status,
    deleteDriverSuccess.status,
    searchKey,
  ]);

  useEffect(() => {
    dispatch(fetchDriverTypes());
    dispatch(fetchDriverStatus());
  }, [dispatch]);

  useEffect(() => {
    if (addDriverSuccess.status) {
      toast.success("Driver Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddDriverSuccess());
    }
  }, [addDriverSuccess.status, dispatch]);

  useEffect(() => {
    if (addDriverSuccess.error) {
      toast.error(addDriverSuccess.error, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddDriverSuccess());
    }
  }, [addDriverSuccess.error, dispatch]);

  useEffect(() => {
    if (deleteDriverSuccess.status) {
      toast.success("Driver Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteDriverSuccess());
    }
  }, [deleteDriverSuccess.status, dispatch]);

  const onSubmit = (data: CreateDriveType, id?: string) => {
    if (editingDriver && id) {
      dispatch(updateDriver(data, id));
    } else {
      dispatch(addDriver(data));
    }
    setIsAddDriverOpen(false);
    dispatch(ResetAddDriverSuccess());
  };

  const handleDeleteDriver = async (id: string) => {
    await dispatch(deleteDriver(id));
    setIsDeleteDriverOpen(false);
  };

  return {
    driversPaginated,
    currentPage,
    SearchInput,
    isAddDriverOpen,
    setIsAddDriverOpen,
    editingDriver,
    setEditingDriver,
    isDeleteDriverOpen,
    setIsDeleteDriverOpen,
    driverStatus,
    driverTypes,
    onSubmit,
    handleDeleteDriver,
    deleteDriverSuccess,
  };
};

export default useDrivers;
