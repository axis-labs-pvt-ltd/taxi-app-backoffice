import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { InquiriesActionTypes } from "../redux/Inquiries/InquiriesReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecentInquiries } from "../redux/Inquiries/InquiriesAction";
import {
  fetchMonthlyIncome,
  fetchTotalIncome,
} from "../redux/Dashboard/DashboardAction";

type AppDispatch = ThunkDispatch<RootState, unknown, InquiriesActionTypes>;

const useDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { recentInquiries } = useSelector(
    (state: RootState) => state.inquiries
  );
  const { totalIncome, monthlyIncome } = useSelector(
    (state: RootState) => state.dashboard
  );
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  firstDayOfMonth.setHours(23, 59, 59, 999);
  const [startDate, setStartDate] = useState<Date | null>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: firstDayOfMonth.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  });

  useEffect(() => {
    dispatch(fetchRecentInquiries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchTotalIncome(selectedDateRange.startDate, selectedDateRange.endDate)
    );
  }, [dispatch, selectedDateRange]);

  useEffect(() => {
    dispatch(fetchMonthlyIncome());
  }, [dispatch]);

  return {
    recentInquiries,
    totalIncome,
    monthlyIncome,
    showPopup,
    setShowPopup,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSelectedDateRange,
  };
};

export default useDashboard;
