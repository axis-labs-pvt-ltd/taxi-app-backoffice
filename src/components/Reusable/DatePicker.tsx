import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type DatePickerProps = {
  toDate: any;
  date: any;
  setDate: any;
  handleDateChange: any;
  handlePrevDate: any;
  handleNextDate: any;
};

const DatePicker: React.FC<DatePickerProps> = ({
  toDate,
  date,
  setDate,
  handleDateChange,
  handlePrevDate,
  handleNextDate,
}) => {
  return (
    <>
      <div className="space-y-2 relative">
        <p className="text-xs text-[#323232] font-medium">Date</p>
        <div className="flex items-center">
          <input
            type="date"
            className="border border-[#E4E3E3] rounded-md placeholder:text-[#C6C6C6] text-sm w-[250px] uppercase hover:border-[#c7c6c6] p-2"
            value={date}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
          />
          <div
            className="px-2 py-[10px] border rounded-md ml-4 cursor-pointer hover:border-[#c7c6c6]"
            onClick={handlePrevDate}
          >
            <MdArrowBackIosNew color="#545454" />
          </div>
          <div
            className={`px-2 py-[10px] border rounded-md ml-2 ${
              date === new Date().toISOString().split("T")[0]
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:border-[#c7c6c6]"
            }`}
            onClick={
              date === new Date().toISOString().split("T")[0]
                ? undefined
                : handleNextDate
            }
          >
            <MdArrowForwardIos color="#545454" />
          </div>
          <div
            className="bg-[#B0E5F1] px-10 py-2 rounded-md ml-8 cursor-pointer"
            onClick={() => {
              setDate(toDate.toISOString().split("T")[0]);
            }}
          >
            <p className="text-[11px] text-[#232323] font-medium ">Today</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
