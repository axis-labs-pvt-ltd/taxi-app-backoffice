import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { ReportsActionTypes } from "../redux/Reports/ReportsReducer";
import { useState } from "react";
import {
  clearProfitReport,
  fetchProfitReport,
} from "../redux/Reports/ReportAction";

type AppDispatch = ThunkDispatch<RootState, unknown, ReportsActionTypes>;

const useProfitReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const { profitReport } = useSelector((state: RootState) => state.reports);
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  firstDayOfMonth.setHours(23, 59, 59, 999);
  const [startDate, setStartDate] = useState<Date | null>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [__selectedDateRange, setSelectedDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: firstDayOfMonth.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  });

  const handleDownload = (startDate: string, endDate: string) => {
    dispatch(fetchProfitReport(startDate, endDate));
  };

  const handleClearProfitReport = () => {
    dispatch(clearProfitReport());
  };

  return {
    profitReport,
    showPopup,
    setShowPopup,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSelectedDateRange,
    handleDownload,
    handleClearProfitReport,
  };
};

export default useProfitReport;
