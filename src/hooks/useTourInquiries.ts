import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { TourInquiriesActionTypes } from "../redux/TourInquiries/TourInquiryReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  assignVehicleToTourInquiry,
  fetchMetersByTourInquiry,
  fetchTourInquiriesPaginated,
  ResetAssignVehicleToTourInquirySuccess,
  ResetUpdateTourDiscountSuccess,
  ResetupdateTourInquiryMeterValuesSuccess,
  ResetupdateTourTotalDistanceSuccess,
  updateTourDiscount,
  updateTourInquiryMeterValues,
  updateTourTotalDistance,
} from "../redux/TourInquiries/TourInquiryAction";
import { MainRoutes } from "../data/route.data";
import { fetchVehicleModels } from "../redux/VehicleModels/VehicleModelsAction";
import {
  AssignVehicleType,
  updateActualDistanceType,
  UpdateMeterValuesType,
} from "../types/Vehicle.types";
import { fetchVehiclesByModelAndDate } from "../redux/Vehicles/VehiclesAction";
import { Slide, toast } from "react-toastify";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { AddCostsType } from "../types/CostCategory.types";
import { addCosts, ResetAddCostsSuccess } from "../redux/Costs/CostsAction";
import { CostsActionTypes } from "../redux/Costs/CostsReducer";
import { fetchCostCategories } from "../redux/CostCategories/CostCategoriesAction";
import { TourInquiryDataType } from "../types/TourInquiry.types";

type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TourInquiriesActionTypes | InquiriesActionTypes | CostsActionTypes
>;

const useTourInquiries = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const { tourInquiriesPaginated } = useSelector(
    (state: RootState) => state.tourInquiries
  );
  const { vehicleModelsEssentials } = useSelector(
    (state: RootState) => state.vehicleModels
  );
  const { vehiclesByModelAndDate } = useSelector(
    (state: RootState) => state.vehicles
  );
  const {
    updateInquirySuccess,
    updateActualTotalDistanceSuccess,
    // updateInquiryStatusSuccess,
    updateMeterValuesSuccess,
    metersByInquiry,
    updateDiscountSuccess,
  } = useSelector((state: RootState) => state.inquiries);
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
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [isUpdateDistanceModalOpen, setIsUpdateDistanceModalOpen] =
    useState<boolean>(false);
  const [isAddCostsOpen, setIsAddCostsOpen] = useState<boolean>(false);
  const [isUpdateMeterValuesModalOpen, setIsUpdateMeterValuesModalOpen] =
    useState<boolean>(false);
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState<boolean>(false);
  const [selectedInquiry, setselectedInquiry] = useState<
    TourInquiryDataType | undefined
  >(undefined);
  const [isInquiryViewOpen, setIsInquiryViewOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchTourInquiriesPaginated({
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
        fetchTourInquiriesPaginated({
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
    // updateInquiryStatusSuccess.status,
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
      dispatch(ResetAssignVehicleToTourInquirySuccess());
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
      dispatch(ResetupdateTourTotalDistanceSuccess());
    }
  }, [updateActualTotalDistanceSuccess.status, dispatch]);

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
      dispatch(ResetupdateTourInquiryMeterValuesSuccess());
    }
  }, [updateMeterValuesSuccess.status, dispatch]);

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
      dispatch(ResetUpdateTourDiscountSuccess());
    }
  }, [updateDiscountSuccess.status, dispatch]);

  const handleNavigate = () => {
    navigate(MainRoutes.tours);
  };

  const handleGetVehicleModels = async () => {
    await dispatch(fetchVehicleModels());
  };

  const assignVehicle = (data: AssignVehicleType) => {
    if (inquiryId) {
      dispatch(assignVehicleToTourInquiry(data, inquiryId));
    }
    setInquiryId(null);
    setDate(null);
  };

  const handleFetchVehiclesByModelAndDate = async (modelId: string) => {
    if (date) {
      await dispatch(fetchVehiclesByModelAndDate(modelId, date));
    }
  };

  const handleUpdateActualDistance = (data: updateActualDistanceType) => {
    if (inquiryId) {
      dispatch(updateTourTotalDistance(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleFetchCostCategories = async () => {
    await dispatch(fetchCostCategories());
  };

  const handleAddCosts = async (data: AddCostsType) => {
    const payload = {
      ...data,
      tourInquiryId: inquiryId,
    };
    await dispatch(addCosts(payload));
  };

  const handleFetchMetersByTourInquiry = async (inquiryId: string) => {
    await dispatch(fetchMetersByTourInquiry(inquiryId));
    setIsUpdateMeterValuesModalOpen(true);
  };

  const handleUpdateMeterValues = (data: UpdateMeterValuesType) => {
    if (inquiryId) {
      dispatch(updateTourInquiryMeterValues(data, inquiryId));
    }
    setInquiryId(null);
  };

  const handleUpdateDiscount = (discount: number) => {
    const payload = {
      discount: discount,
    };
    if (inquiryId) {
      dispatch(updateTourDiscount(payload, inquiryId));
    }
    setInquiryId(null);
    setIsAddDiscountOpen(false);
  };

  return {
    currentPage,
    tourInquiriesPaginated,
    SearchInput,
    handleNavigate,
    isAssignVehicleModalOpen,
    setIsAssignVehicleModalOpen,
    setInquiryId,
    setDate,
    vehicleModelsEssentials,
    handleGetVehicleModels,
    vehiclesByModelAndDate,
    assignVehicle,
    handleFetchVehiclesByModelAndDate,
    isUpdateDistanceModalOpen,
    setIsUpdateDistanceModalOpen,
    handleUpdateActualDistance,
    isAddCostsOpen,
    setIsAddCostsOpen,
    costCategories,
    handleFetchCostCategories,
    handleAddCosts,
    isUpdateMeterValuesModalOpen,
    setIsUpdateMeterValuesModalOpen,
    handleFetchMetersByTourInquiry,
    metersByInquiry,
    handleUpdateMeterValues,
    isAddDiscountOpen,
    setIsAddDiscountOpen,
    selectedInquiry,
    setselectedInquiry,
    handleUpdateDiscount,
    isInquiryViewOpen,
    setIsInquiryViewOpen,
  };
};

export default useTourInquiries;
