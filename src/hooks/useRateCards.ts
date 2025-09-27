import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { RateCardsActionTypes } from "../redux/RateCards/RateCardsReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import { useEffect, useState } from "react";
import { RateCardsType } from "../types/RateCards.types";
import {
  addRateCard,
  deleteRateCard,
  fetchRateCardsPaginated,
  ResetAddRateCardSuccess,
  ResetDeleteRateCardSuccess,
  updateRateCard,
} from "../redux/RateCards/RateCardsAction";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, RateCardsActionTypes>;

const useRateCards = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const { rateCardsPaginated, addRateCardSuccess, deleteRateCardSuccess } =
    useSelector((state: RootState) => state.rateCards);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for rate card",
    placeholder: "Search for rate card",
  });
  const [isAddRateCardOpen, setIsAddRateCardOpen] = useState<boolean>(false);
  const [editingRateCard, setEditingRateCard] = useState<
    RateCardsType | undefined
  >(undefined);
  const [isDeleteRateCardOpen, setIsDeleteRateCardOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchRateCardsPaginated({
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
        fetchRateCardsPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [
    dispatch,
    addRateCardSuccess.status,
    deleteRateCardSuccess.status,
    searchKey,
  ]);

  useEffect(() => {
    if (addRateCardSuccess.status) {
      toast.success("Rate Card Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddRateCardSuccess());
    }
  }, [addRateCardSuccess.status, dispatch]);

  useEffect(() => {
    if (addRateCardSuccess.error) {
      toast.error(addRateCardSuccess.error, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddRateCardSuccess());
    }
  }, [addRateCardSuccess.error, dispatch]);

  useEffect(() => {
    if (deleteRateCardSuccess.status) {
      toast.success("Rate Card Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteRateCardSuccess());
    }
  }, [deleteRateCardSuccess.status, dispatch]);

  const onSubmit = (data: RateCardsType, id?: string) => {
    if (editingRateCard && id) {
      dispatch(updateRateCard(data, id));
    } else {
      dispatch(addRateCard(data));
    }
    setIsAddRateCardOpen(false);
    dispatch(ResetAddRateCardSuccess());
  };

  const handleDeleteRateCard = async (id: string) => {
    await dispatch(deleteRateCard(id));
    setIsDeleteRateCardOpen(false);
  };

  return {
    rateCardsPaginated,
    SearchInput,
    currentPage,
    isAddRateCardOpen,
    setIsAddRateCardOpen,
    editingRateCard,
    setEditingRateCard,
    onSubmit,
    isDeleteRateCardOpen,
    setIsDeleteRateCardOpen,
    handleDeleteRateCard,
    deleteRateCardSuccess,
  };
};

export default useRateCards;
