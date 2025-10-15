import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { WeddingInquiriesActionTypes } from "../redux/WeddingInquiries/WeddingInquiriesReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  assignVeicleToWeddingInquiry,
  fetchMetersByWeddingInquiry,
  fetchWeddingInquiriesPaginated,
  ResetAssignVehicleSuccess,
  ResetupdateTotalDistanceSuccess,
  ResetUpdateWeddingDiscountSuccess,
  ResetupdateWeddingInquiryMeterValuesSuccess,
  ResetupdateWeddingInquiryStatusSuccess,
  updateTotalDistance,
  updateWeddingDiscount,
  updateWeddingInquiryMeterValues,
  updateWeddingInquiryStatus,
} from "../redux/WeddingInquiries/WeddingInquiriesAction";
import { fetchVehiclesByModelAndDate } from "../redux/Vehicles/VehiclesAction";
import {
  AssignVehicleType,
  updateActualDistanceType,
  UpdateMeterValuesType,
} from "../types/Vehicle.types";
import { Slide, toast } from "react-toastify";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { WeddingInquiryPaginatedDataType } from "../types/WeddingInquiry.types";
import { fetchCostCategories } from "../redux/CostCategories/CostCategoriesAction";
import { AddCostsType } from "../types/CostCategory.types";
import { addCosts, ResetAddCostsSuccess } from "../redux/Costs/CostsAction";
import { CostsActionTypes } from "../redux/Costs/CostsReducer";

type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  WeddingInquiriesActionTypes | InquiriesActionTypes | CostsActionTypes
>;

const useWeddingInquiries = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const { weddingInquiriesPaginated } = useSelector(
    (state: RootState) => state.weddingInquiries
  );
  const {
    updateInquirySuccess,
    updateActualTotalDistanceSuccess,
    metersByInquiry,
    updateMeterValuesSuccess,
    updateInquiryStatusSuccess,
    updateDiscountSuccess,
  } = useSelector((state: RootState) => state.inquiries);
  const { vehiclesByModelAndDate } = useSelector(
    (state: RootState) => state.vehicles
  );
  const { costCategories } = useSelector(
    (state: RootState) => state.costCategories
  );
  const { addCostsSuccess } = useSelector((state: RootState) => state.costs);

  const [isAssignVehicleModalOpen, setIsAssignVehicleModalOpen] =
    useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [isUpdateDistanceModalOpen, setIsUpdateDistanceModalOpen] =
    useState<boolean>(false);
  const [isUpdateMeterValuesModalOpen, setIsUpdateMeterValuesModalOpen] =
    useState<boolean>(false);
  const [isWeddingInquiryViewOpen, setIsWeddingInquiryViewOpen] =
    useState<boolean>(false);
  const [selectedInquiry, setselectedInquiry] = useState<
    WeddingInquiryPaginatedDataType | undefined
  >(undefined);
  const [isAddCostsOpen, setIsAddCostsOpen] = useState<boolean>(false);
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState<boolean>(false);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for inquiry",
    placeholder: "Search for inquiry",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchWeddingInquiriesPaginated({
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
        fetchWeddingInquiriesPaginated({
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
    updateMeterValuesSuccess.status,
    searchKey,
    addCostsSuccess.status,
    updateDiscountSuccess.status,
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
      dispatch(ResetAssignVehicleSuccess());
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
      dispatch(ResetupdateTotalDistanceSuccess());
    }
  }, [updateActualTotalDistanceSuccess.status, dispatch]);

  useEffect(() => {
    if (updateMeterValuesSuccess.status) {
      toast.success("Meter Updated Successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetupdateWeddingInquiryMeterValuesSuccess());
    }
  }, [updateMeterValuesSuccess.status, dispatch]);

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
      dispatch(ResetupdateWeddingInquiryStatusSuccess());
    }
  }, [updateInquiryStatusSuccess.status, dispatch]);

  useEffect(() => {
    if (addCostsSuccess.status) {
      toast.success("Costs Added Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddCostsSuccess());
    }
  }, [addCostsSuccess.status, dispatch]);

  useEffect(() => {
    if (updateDiscountSuccess.status) {
      toast.success("Discount Added Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetUpdateWeddingDiscountSuccess());
    }
  }, [updateDiscountSuccess.status, dispatch]);

  const handleFetchVehiclesByModelAndDate = async (
    modelId: string,
    date: string
  ) => {
    await dispatch(fetchVehiclesByModelAndDate(modelId, date));
    setIsAssignVehicleModalOpen(true);
  };

  const assignVehicle = (data: AssignVehicleType) => {
    if (inquiryId) {
      dispatch(assignVeicleToWeddingInquiry(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleUpdateTotalDistance = (data: updateActualDistanceType) => {
    if (inquiryId) {
      dispatch(updateTotalDistance(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleFetchMetersByWeddingInquiry = async (inquiryId: string) => {
    await dispatch(fetchMetersByWeddingInquiry(inquiryId));
    setIsUpdateMeterValuesModalOpen(true);
  };

  const handleUpdateMeterValues = (data: UpdateMeterValuesType) => {
    if (inquiryId) {
      dispatch(updateWeddingInquiryMeterValues(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleUpdateWeddingInquiryStatus = (data: string, id: string) => {
    const payload = {
      status: data,
    };

    dispatch(updateWeddingInquiryStatus(payload, id));
  };

  const handleFetchCostCategories = async () => {
    await dispatch(fetchCostCategories());
  };

  const handleAddCosts = async (data: AddCostsType) => {
    const payload = {
      ...data,
      weddingInquiryId: inquiryId,
    };
    await dispatch(addCosts(payload));
  };

  const handleUpdateDiscount = (discount: number) => {
    const payload = {
      discount: discount,
    };
    if (inquiryId) {
      dispatch(updateWeddingDiscount(payload, inquiryId));
    }
    setInquiryId(null);
    setIsAddDiscountOpen(false);
  };

  return {
    currentPage,
    weddingInquiriesPaginated,
    SearchInput,
    vehiclesByModelAndDate,
    isAssignVehicleModalOpen,
    setIsAssignVehicleModalOpen,
    handleFetchVehiclesByModelAndDate,
    assignVehicle,
    setInquiryId,
    isUpdateDistanceModalOpen,
    setIsUpdateDistanceModalOpen,
    handleUpdateTotalDistance,
    isUpdateMeterValuesModalOpen,
    setIsUpdateMeterValuesModalOpen,
    handleUpdateMeterValues,
    metersByInquiry,
    handleFetchMetersByWeddingInquiry,
    handleUpdateWeddingInquiryStatus,
    isWeddingInquiryViewOpen,
    setIsWeddingInquiryViewOpen,
    selectedInquiry,
    setselectedInquiry,
    isAddCostsOpen,
    setIsAddCostsOpen,
    costCategories,
    handleFetchCostCategories,
    handleAddCosts,
    isAddDiscountOpen,
    setIsAddDiscountOpen,
    handleUpdateDiscount,
  };
};

export default useWeddingInquiries;
