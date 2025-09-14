import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  fetchInquiriesPaginated,
  ResetupdateActualTotalDistanceSuccess,
  ResetupdateInquiryStatusSuccess,
  ResetupdateInquirySuccess,
  updateActualTotalDistance,
  updateInquiry,
  updateInquiryStatus,
} from "../redux/Inquiries/InquiriesAction";
import { fetchVehiclesByModelAndDate } from "../redux/Vehicles/VehiclesAction";
import {
  AssignVehicleType,
  updateActualDistanceType,
} from "../types/Vehicle.types";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, InquiriesActionTypes>;

const useInquiries = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    inquiriesPaginated,
    updateInquirySuccess,
    updateActualTotalDistanceSuccess,
    updateInquiryStatusSuccess,
  } = useSelector((state: RootState) => state.inquiries);
  const { vehiclesByModelAndDate } = useSelector(
    (state: RootState) => state.vehicles
  );

  const { SearchInput, searchKey } = useSearch({
    text: "Search for inquiry",
    placeholder: "Search for inquiry",
  });
  const [isAssignVehicleModalOpen, setIsAssignVehicleModalOpen] =
    useState<boolean>(false);
  const [isUpdateDistanceModalOpen, setIsUpdateDistanceModalOpen] =
    useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  //   const [editingService, setEditingService] = useState<
  //     ExtraServicePaginatedDataType | undefined
  //   >(undefined);
  //   const [isDeleteServiceOpen, setIsDeleteServiceOpen] =
  //     useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchInquiriesPaginated({
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
        fetchInquiriesPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [
    dispatch,
    updateInquirySuccess.status,
    updateActualTotalDistanceSuccess.status,
    updateInquiryStatusSuccess.status,
    searchKey,
  ]);

  useEffect(() => {
    if (updateInquirySuccess.status) {
      toast.success("Vehicle Assigned Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetupdateInquirySuccess());
    }
  }, [updateInquirySuccess.status, dispatch]);

  useEffect(() => {
    if (updateActualTotalDistanceSuccess.status) {
      toast.success("Distance Updated Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetupdateActualTotalDistanceSuccess());
    }
  }, [updateActualTotalDistanceSuccess.status, dispatch]);

  useEffect(() => {
    if (updateInquiryStatusSuccess.status) {
      toast.success("Inquiry Status Updated Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetupdateInquiryStatusSuccess());
    }
  }, [updateInquiryStatusSuccess.status, dispatch]);

  useEffect(() => {
    if (updateInquiryStatusSuccess.error) {
      toast.error(updateInquiryStatusSuccess.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetupdateInquiryStatusSuccess());
    }
  }, [updateInquiryStatusSuccess.error, dispatch]);

  const handleFetchVehiclesByModelAndDate = async (
    modelId: string,
    date: string
  ) => {
    await dispatch(fetchVehiclesByModelAndDate(modelId, date));
    setIsAssignVehicleModalOpen(true);
  };

  const assignVehicle = (data: AssignVehicleType) => {
    if (inquiryId) {
      dispatch(updateInquiry(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleUpdateActualDistance = (data: updateActualDistanceType) => {
    if (inquiryId) {
      dispatch(updateActualTotalDistance(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleUpdateInquiryStatus = (data: string, id: string) => {
    const payload = {
      status: data,
    };

    dispatch(updateInquiryStatus(payload, id));
  };

  return {
    currentPage,
    inquiriesPaginated,
    SearchInput,
    vehiclesByModelAndDate,
    handleFetchVehiclesByModelAndDate,
    isAssignVehicleModalOpen,
    setIsAssignVehicleModalOpen,
    setInquiryId,
    assignVehicle,
    isUpdateDistanceModalOpen,
    setIsUpdateDistanceModalOpen,
    handleUpdateActualDistance,
    handleUpdateInquiryStatus,
  };
};

export default useInquiries;
