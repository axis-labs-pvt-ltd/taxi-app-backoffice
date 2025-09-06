import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { VehiclesActionTypes } from "../redux/Vehicles/VehiclesReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  CreateVehicleType,
  VehiclePaginatedDataType,
} from "../types/Vehicle.types";
import {
  addVehicle,
  deleteVehicle,
  fetchVehiclesPaginated,
  fetchVehicleTypes,
  ResetAddVehicleSuccess,
  ResetDeleteVehicleSuccess,
  updateVehicle,
} from "../redux/Vehicles/VehiclesAction";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, VehiclesActionTypes>;

const useVehicles = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    vehiclesPaginated,
    vehicleTypes,
    addVehicleSuccess,
    deleteVehicleSuccess,
  } = useSelector((state: RootState) => state.vehicles);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for vehicle",
    placeholder: "Search for vehicle",
  });
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState<boolean>(false);
  const [editingVehicle, setEditingVehicle] = useState<
    VehiclePaginatedDataType | undefined
  >(undefined);
  const [isDeleteVehicleOpen, setIsDeleteVehicleOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchVehiclesPaginated({
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
        fetchVehiclesPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [
    dispatch,
    addVehicleSuccess.status,
    deleteVehicleSuccess.status,
    searchKey,
  ]);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
  }, [dispatch]);

  useEffect(() => {
    if (addVehicleSuccess.status) {
      toast.success("Vehicle Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddVehicleSuccess());
    }
  }, [addVehicleSuccess.status, dispatch]);

  useEffect(() => {
    if (deleteVehicleSuccess.status) {
      toast.success("Vehicle Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteVehicleSuccess());
    }
  }, [deleteVehicleSuccess.status, dispatch]);

  const onSubmit = (data: CreateVehicleType, id?: string) => {
    if (editingVehicle && id) {
      dispatch(updateVehicle(data, id));
    } else {
      dispatch(addVehicle(data));
    }
    setIsAddVehicleOpen(false);
    dispatch(ResetAddVehicleSuccess());
  };

  const handleDeleteVehicle = async (id: string) => {
    await dispatch(deleteVehicle(id));
    setIsDeleteVehicleOpen(false);
  };

  return {
    vehiclesPaginated,
    currentPage,
    SearchInput,
    isAddVehicleOpen,
    setIsAddVehicleOpen,
    editingVehicle,
    setEditingVehicle,
    vehicleTypes,
    onSubmit,
    isDeleteVehicleOpen,
    setIsDeleteVehicleOpen,
    deleteVehicleSuccess,
    handleDeleteVehicle,
  };
};

export default useVehicles;
