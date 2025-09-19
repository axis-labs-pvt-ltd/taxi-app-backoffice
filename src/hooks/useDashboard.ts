import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecentInquiries } from "../redux/Inquiries/InquiriesAction";

type AppDispatch = ThunkDispatch<RootState, unknown, InquiriesActionTypes>;

const useDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { recentInquiries } = useSelector(
    (state: RootState) => state.inquiries
  );

  useEffect(() => {
    dispatch(fetchRecentInquiries());
  }, [dispatch]);

  return {
    recentInquiries,
  };
};

export default useDashboard;
