import React, { useState } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { BiFilterAlt } from "react-icons/bi";

const quickRanges = [
  { label: "This month", type: "month" },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 3 months", type: "3months" },
  { label: "This year", type: "year" },
];

interface DateRangeFilterProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedDateRange: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  showPopup,
  setShowPopup,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setSelectedDateRange,
}) => {
  const [selectedQuickLabel, setSelectedQuickLabel] = useState<string | null>(
    "This month"
  );

  const format = (date: Date | null) =>
    date ? dayjs(date).format("YYYY-MM-DD") : "";

  const applyQuickRange = (range: any) => {
    const now = dayjs();
    let start;
    let end = now;

    if (range.days) {
      start = now.subtract(range.days - 1, "day");
    } else if (range.type === "month") {
      start = now.startOf("month");
    } else if (range.type === "3months") {
      start = now.subtract(3, "month").startOf("month");
    } else if (range.type === "year") {
      start = now.startOf("year");
    }

    setStartDate(start ? start.toDate() : null);
    setEndDate(end.toDate());
    setSelectedQuickLabel(range.label); // ✅ update selected
  };

  const applyCustomRange = () => {
    const formattedStart = format(startDate);
    const formattedEnd = format(endDate);

    setSelectedDateRange({
      startDate: formattedStart,
      endDate: formattedEnd,
    });

    setShowPopup(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-[#F30E0A] text-white font-normal rounded flex items-center gap-2"
        onClick={() => setShowPopup(!showPopup)}
      >
        Filters
        <BiFilterAlt color="white" />
      </button>

      {showPopup && (
        <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border rounded p-4 z-50 w-72">
          <h3 className="font-semibold mb-2">Select Date Range</h3>
          <div className="border-b mb-2" />

          <div className="space-y-1 mb-4">
            {quickRanges.map((range, idx) => (
              <button
                key={idx}
                onClick={() => applyQuickRange(range)}
                className={`w-full text-left px-2 py-1 rounded transition
      ${
        selectedQuickLabel === range.label
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "hover:bg-gray-100"
      }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="border-b mb-2" />

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={applyCustomRange}
            className="w-full bg-[#3A0CA3] text-white py-2 rounded"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
