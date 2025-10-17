import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  fetchInquiriesPaginated,
  fetchMetersByInquiry,
  ResetupdateActualTotalDistanceSuccess,
  ResetUpdateDiscountSuccess,
  ResetupdateInquiryStatusSuccess,
  ResetupdateInquirySuccess,
  ResetupdateMeterValuesSuccess,
  updateActualTotalDistance,
  updateDiscount,
  updateInquiry,
  updateInquiryStatus,
  updateMeterValues,
} from "../redux/Inquiries/InquiriesAction";
import { fetchVehiclesByModelAndDate } from "../redux/Vehicles/VehiclesAction";
import {
  AssignVehicleType,
  updateActualDistanceType,
  UpdateMeterValuesType,
} from "../types/Vehicle.types";
import { Slide, toast } from "react-toastify";
import { InquiryPaginatedDataType } from "../types/Inquiries.types";
import { fetchCostCategories } from "../redux/CostCategories/CostCategoriesAction";
import { addCosts, ResetAddCostsSuccess } from "../redux/Costs/CostsAction";
import { AddCostsType } from "../types/CostCategory.types";
import { CostsActionTypes } from "../redux/Costs/CostsReducer";

type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  InquiriesActionTypes | CostsActionTypes
>;

const useInquiries = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    inquiriesPaginated,
    updateInquirySuccess,
    updateActualTotalDistanceSuccess,
    updateInquiryStatusSuccess,
    updateMeterValuesSuccess,
    metersByInquiry,
    updateDiscountSuccess,
  } = useSelector((state: RootState) => state.inquiries);
  const { vehiclesByModelAndDate } = useSelector(
    (state: RootState) => state.vehicles
  );
  const { costCategories } = useSelector(
    (state: RootState) => state.costCategories
  );
  const { addCostsSuccess } = useSelector((state: RootState) => state.costs);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for inquiry",
    placeholder: "Search for inquiry",
  });
  const [isAssignVehicleModalOpen, setIsAssignVehicleModalOpen] =
    useState<boolean>(false);
  const [isUpdateDistanceModalOpen, setIsUpdateDistanceModalOpen] =
    useState<boolean>(false);
  const [isUpdateMeterValuesModalOpen, setIsUpdateMeterValuesModalOpen] =
    useState<boolean>(false);
  const [isInquiryViewOpen, setIsInquiryViewOpen] = useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [selectedInquiry, setselectedInquiry] = useState<
    InquiryPaginatedDataType | undefined
  >(undefined);
  //   const [isDeleteServiceOpen, setIsDeleteServiceOpen] =
  //     useState<boolean>(false);
  const [isAddCostsOpen, setIsAddCostsOpen] = useState<boolean>(false);
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState<boolean>(false);

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
      dispatch(ResetupdateMeterValuesSuccess());
    }
  }, [updateMeterValuesSuccess.status, dispatch]);

  useEffect(() => {
    if (addCostsSuccess.status) {
      toast.success("Costs Added Successfully!", {
        position: "top-center",
        autoClose: 1000,
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
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetUpdateDiscountSuccess());
    }
  }, [updateDiscountSuccess.status, dispatch]);

  const handleFetchVehiclesByModelAndDate = async (
    modelId: string,
    date: string
  ) => {
    await dispatch(fetchVehiclesByModelAndDate(modelId, date));
    setIsAssignVehicleModalOpen(true);
  };

  const handleFetchMetersByInquiry = async (inquiryId: string) => {
    await dispatch(fetchMetersByInquiry(inquiryId));
    setIsUpdateMeterValuesModalOpen(true);
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

  const handleUpdateMeterValues = (data: UpdateMeterValuesType) => {
    if (inquiryId) {
      dispatch(updateMeterValues(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleFetchCostCategories = async () => {
    await dispatch(fetchCostCategories());
  };

  const handleAddCosts = async (data: AddCostsType) => {
    const payload = {
      ...data,
      inquiryId: inquiryId,
    };
    await dispatch(addCosts(payload));
  };

  const handleUpdateDiscount = (discount: number) => {
    const payload = {
      discount: discount,
    };
    if (inquiryId) {
      dispatch(updateDiscount(payload, inquiryId));
    }
    setInquiryId(null);
    setIsAddDiscountOpen(false);
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
    isUpdateMeterValuesModalOpen,
    setIsUpdateMeterValuesModalOpen,
    handleUpdateMeterValues,
    handleFetchMetersByInquiry,
    metersByInquiry,
    isInquiryViewOpen,
    setIsInquiryViewOpen,
    selectedInquiry,
    setselectedInquiry,
    costCategories,
    handleFetchCostCategories,
    isAddCostsOpen,
    setIsAddCostsOpen,
    handleAddCosts,
    isAddDiscountOpen,
    setIsAddDiscountOpen,
    handleUpdateDiscount,
  };
};

export default useInquiries;
