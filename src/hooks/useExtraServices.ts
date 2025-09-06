import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { ExtraServiceActionTypes } from "../redux/ExtraServices/ExtraServicesReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import {
  CreateExtraServiceType,
  ExtraServicePaginatedDataType,
} from "../types/ExtraServices.types";
import {
  addExtraService,
  deleteExtraService,
  fetchExtraServicesPaginated,
  ResetAddExtraServiceSuccess,
  ResetDeleteExtraServiceSuccess,
  updateService,
} from "../redux/ExtraServices/ExtraServicesAction";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, ExtraServiceActionTypes>;

const useExtraServices = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    extraServicesPaginated,
    addExtraServiceSuccess,
    deleteExtraServiceSuccess,
  } = useSelector((state: RootState) => state.extraServices);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for service",
    placeholder: "Search for service",
  });
  const [isAddServiceOpen, setIsAddServiceOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<
    ExtraServicePaginatedDataType | undefined
  >(undefined);
  const [isDeleteServiceOpen, setIsDeleteServiceOpen] =
    useState<boolean>(false);
  const [isFree, setIsFree] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchExtraServicesPaginated({
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
        fetchExtraServicesPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [
    dispatch,
    addExtraServiceSuccess.status,
    deleteExtraServiceSuccess.status,
    searchKey,
  ]);

  useEffect(() => {
    if (addExtraServiceSuccess.status) {
      toast.success("Service Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddExtraServiceSuccess());
    }
  }, [addExtraServiceSuccess.status, dispatch]);

  useEffect(() => {
    if (deleteExtraServiceSuccess.status) {
      toast.success("Service Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteExtraServiceSuccess());
    }
  }, [deleteExtraServiceSuccess.status, dispatch]);

  const onSubmit = (data: CreateExtraServiceType, id?: string) => {
    if (editingService && id) {
      dispatch(updateService(data, id));
    } else {
      dispatch(addExtraService(data));
    }
    setIsAddServiceOpen(false);
    dispatch(ResetAddExtraServiceSuccess());
    setIsFree(false);
  };

  const handleDeleteService = async (id: string) => {
    await dispatch(deleteExtraService(id));
    setIsDeleteServiceOpen(false);
  };

  return {
    extraServicesPaginated,
    currentPage,
    SearchInput,
    isAddServiceOpen,
    setIsAddServiceOpen,
    editingService,
    setEditingService,
    isDeleteServiceOpen,
    setIsDeleteServiceOpen,
    onSubmit,
    isFree,
    setIsFree,
    deleteExtraServiceSuccess,
    handleDeleteService,
  };
};

export default useExtraServices;
