import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  fetchInquiriesPaginated,
  updateInquiry,
} from "../redux/Inquiries/InquiriesAction";
import { fetchVehiclesByModelAndDate } from "../redux/Vehicles/VehiclesAction";
import { AssignVehicleType } from "../types/Vehicle.types";

type AppDispatch = ThunkDispatch<RootState, unknown, InquiriesActionTypes>;

const useInquiries = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const { inquiriesPaginated } = useSelector(
    (state: RootState) => state.inquiries
  );
  const { vehiclesByModelAndDate } = useSelector(
    (state: RootState) => state.vehicles
  );

  const { SearchInput, searchKey } = useSearch({
    text: "Search for inquiry",
    placeholder: "Search for inquiry",
  });
  const [isAssignVehicleModalOpen, setIsAssignVehicleModalOpen] =
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
    // deleteVehicleSuccess.status,
    searchKey,
  ]);

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
  };

  console.log(vehiclesByModelAndDate.data)

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
  };
};

export default useInquiries;
