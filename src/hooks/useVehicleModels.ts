import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { VehicleModelsActionTypes } from "../redux/VehicleModels/VehicleModelsReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  CreateVehicleModelType,
  VehicleModelsPaginatedDataType,
} from "../types/VehicleModels.types";
import {
  addVehicleModel,
  deleteVehicleModel,
  fetchVehicleModelsPaginated,
  ResetAddVehicleModelSuccess,
  ResetDeleteVehicleModelSuccess,
  updateVehicleModel,
} from "../redux/VehicleModels/VehicleModelsAction";
import {
  fetchVehicleBrands,
  fetchVehicleTypes,
} from "../redux/Vehicles/VehiclesAction";
import { fetchRateCards } from "../redux/RateCards/RateCardsAction";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, VehicleModelsActionTypes>;

const useVehicleModels = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    vehicleModelsPaginated,
    addVehicleModelSuccess,
    deleteVehicleModelSuccess,
  } = useSelector((state: RootState) => state.vehicleModels);
  const { vehicleTypes, vehicleBrands } = useSelector(
    (state: RootState) => state.vehicles
  );
  const { rateCards } = useSelector((state: RootState) => state.rateCards);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for vehicle model",
    placeholder: "Search for vehicle model",
  });
  const [isAddVehicleModelOpen, setIsAddVehicleModelOpen] =
    useState<boolean>(false);
  const [editingVehicleModel, setEditingVehicleModel] = useState<
    VehicleModelsPaginatedDataType | undefined
  >(undefined);
  const [isDeleteVehicleModelOpen, setIsDeleteVehicleModelOpen] =
    useState<boolean>(false);
  const [isAirConditioned, setIsAirConditioned] = useState<boolean>(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchVehicleModelsPaginated({
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
        fetchVehicleModelsPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [
    dispatch,
    addVehicleModelSuccess.status,
    deleteVehicleModelSuccess.status,
    searchKey,
  ]);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
    dispatch(fetchVehicleBrands());
    dispatch(fetchRateCards());
  }, [dispatch]);

  useEffect(() => {
    if (addVehicleModelSuccess.status) {
      toast.success("Vehicle Model Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddVehicleModelSuccess());
    }
  }, [addVehicleModelSuccess.status, dispatch]);

  useEffect(() => {
    if (deleteVehicleModelSuccess.status) {
      toast.success("Vehicle Model Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteVehicleModelSuccess());
    }
  }, [deleteVehicleModelSuccess.status, dispatch]);

  const onSubmit = (data: CreateVehicleModelType, id?: string) => {
    if (editingVehicleModel && id) {
      dispatch(updateVehicleModel(data, id));
    } else {
      dispatch(addVehicleModel(data));
    }
    setIsAddVehicleModelOpen(false);
    dispatch(ResetAddVehicleModelSuccess());
  };

  const handleDeleteVehicleModel = async (id: string) => {
    await dispatch(deleteVehicleModel(id));
    setIsDeleteVehicleModelOpen(false);
  };

  return {
    vehicleModelsPaginated,
    currentPage,
    SearchInput,
    vehicleTypes,
    vehicleBrands,
    isAddVehicleModelOpen,
    setIsAddVehicleModelOpen,
    isAirConditioned,
    setIsAirConditioned,
    editingVehicleModel,
    setEditingVehicleModel,
    onSubmit,
    rateCards,
    isDeleteVehicleModelOpen,
    setIsDeleteVehicleModelOpen,
    handleDeleteVehicleModel,
    deleteVehicleModelSuccess,
  };
};

export default useVehicleModels;
