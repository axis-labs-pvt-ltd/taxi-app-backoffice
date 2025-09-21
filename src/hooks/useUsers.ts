import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { UsersActionTypes } from "../redux/Users/UsersReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSearch from "./useSearch";
import {
  addUser,
  deleteUser,
  fetchUsersPaginated,
  ResetAddUserSuccess,
  ResetDeleteUserSuccess,
  resetPassword,
  ResetResetPasswordSuccess,
  updateUser,
} from "../redux/Users/UsersAction";
import { useEffect, useState } from "react";
import { ResetPasswordType, UsersDataType } from "../types/Users.types";
import { Slide, toast } from "react-toastify";

type AppDispatch = ThunkDispatch<RootState, unknown, UsersActionTypes>;

const useUsers = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const currentPage = parseInt(pageNumber ?? "1", 10);
  const dispatch: AppDispatch = useDispatch();
  const {
    usersPaginated,
    addUserSuccess,
    resetPasswordSuccess,
    deleteUserSuccess,
  } = useSelector((state: RootState) => state.users);

  const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UsersDataType | undefined>(
    undefined
  );
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState<boolean>(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] =
    useState<boolean>(false);

  const { SearchInput, searchKey } = useSearch({
    text: "Search for user",
    placeholder: "Search for user",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKey) {
        dispatch(
          fetchUsersPaginated({
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
        fetchUsersPaginated({
          pageNumber: currentPage,
          pageSize: 6,
          searchKey,
        })
      );
    }
  }, [dispatch, addUserSuccess.status, deleteUserSuccess.status, searchKey]);

  useEffect(() => {
    if (addUserSuccess.status) {
      toast.success("User Saved Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetAddUserSuccess());
    }
  }, [addUserSuccess.status, dispatch]);

  useEffect(() => {
    if (resetPasswordSuccess.status) {
      toast.success("Password Reset Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetResetPasswordSuccess());
    }
  }, [resetPasswordSuccess.status, dispatch]);

  useEffect(() => {
    if (deleteUserSuccess.status) {
      toast.success("User Deleted Successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteUserSuccess());
    }
  }, [deleteUserSuccess.status, dispatch]);

  useEffect(() => {
    if (deleteUserSuccess.error) {
      toast.error(deleteUserSuccess.error, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      dispatch(ResetDeleteUserSuccess());
    }
  }, [deleteUserSuccess.error, dispatch]);

  const onSubmit = (data: UsersDataType, id?: string) => {
    if (editingUser && id) {
      dispatch(updateUser(data, id));
    } else {
      dispatch(addUser(data));
    }
    setIsAddUserOpen(false);
    dispatch(ResetAddUserSuccess());
  };

  const handleResetPassword = async (data: ResetPasswordType, id: string) => {
    await dispatch(resetPassword(data, id));
  };

  const handleDeleteUser = async (id: string) => {
    await dispatch(deleteUser(id));
    setIsDeleteUserOpen(false);
  };

  return {
    currentPage,
    usersPaginated,
    SearchInput,
    isAddUserOpen,
    setIsAddUserOpen,
    editingUser,
    setEditingUser,
    isDeleteUserOpen,
    setIsDeleteUserOpen,
    onSubmit,
    isResetPasswordOpen,
    setIsResetPasswordOpen,
    handleResetPassword,
    handleDeleteUser,
    deleteUserSuccess,
  };
};

export default useUsers;
