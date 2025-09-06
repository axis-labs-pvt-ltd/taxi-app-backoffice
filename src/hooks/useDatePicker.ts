import Cookies from "js-cookie";
import { useState } from "react";

const useDatePicker = () => {
  const storedDate = Cookies.get("saleReportDate");
  const toDate = new Date();
  const initialDate = storedDate
    ? storedDate
    : toDate.toISOString().split("T")[0];

  const [date, setDate] = useState(initialDate);

  const handleDateChange = (event: { target: { value: any } }) => {
    const newDate = event.target.value;

    if (newDate) {
      setDate(newDate);

      Cookies.set("saleReportDate", newDate.toISOString().split("T")[0]);
    } else {
      event.target.value = date;
    }
  };

  const handlePrevDate = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedDate = prevDate.toISOString().split("T")[0];
    setDate(formattedDate);
    // localStorage.setItem("attendanceDate", formattedDate);
    Cookies.set("saleReportDate", formattedDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const formattedDate = nextDate.toISOString().split("T")[0];
    setDate(formattedDate);
    // localStorage.setItem("attendanceDate", formattedDate);
    Cookies.set("saleReportDate", formattedDate);
  };

  return {
    toDate,
    date,
    setDate,
    handleDateChange,
    handlePrevDate,
    handleNextDate,
  };
};

export default useDatePicker;
