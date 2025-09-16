import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { MainRoutes } from "../../data/route.data";
import { RootState } from "../../redux/store";
import { fetchVehiclesPaginated } from "../../redux/Vehicles/VehiclesAction";
import { VehiclesActionTypes } from "../../redux/Vehicles/VehiclesReducer";
import { fetchExtraServicesPaginated } from "../../redux/ExtraServices/ExtraServicesAction";
import { fetchDriversPaginated } from "../../redux/Drivers/DriversAction";
import { fetchInquiriesPaginated } from "../../redux/Inquiries/InquiriesAction";
import { fetchVehicleModelsPaginated } from "../../redux/VehicleModels/VehicleModelsAction";
import { fetchRateCardsPaginated } from "../../redux/RateCards/RateCardsAction";

type AppDispatch = ThunkDispatch<RootState, unknown, VehiclesActionTypes>;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  type: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  type,
}) => {
  const [customPage, setCustomPage] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    if (type === "vehicles") {
      navigate(`${MainRoutes.vehicles}/${page}`);
      dispatch(
        fetchVehiclesPaginated({ pageNumber: page, pageSize: 6, searchKey: "" })
      );
    } else if (type === "services") {
      navigate(`${MainRoutes.extraServices}/${page}`);
      dispatch(
        fetchExtraServicesPaginated({
          pageNumber: page,
          pageSize: 6,
          searchKey: "",
        })
      );
    } else if (type === "drivers") {
      navigate(`${MainRoutes.drivers}/${page}`);
      dispatch(
        fetchDriversPaginated({
          pageNumber: page,
          pageSize: 6,
          searchKey: "",
        })
      );
    } else if (type === "inquiries") {
      navigate(`${MainRoutes.inquiries}/${page}`);
      dispatch(
        fetchInquiriesPaginated({
          pageNumber: page,
          pageSize: 6,
          searchKey: "",
        })
      );
    } else if (type === "vehicleModels") {
      navigate(`${MainRoutes.vehicleModels}/${page}`);
      dispatch(
        fetchVehicleModelsPaginated({
          pageNumber: page,
          pageSize: 6,
          searchKey: "",
        })
      );
    } else if (type === "rateCards") {
      navigate(`${MainRoutes.rateCards}/${page}`);
      dispatch(
        fetchRateCardsPaginated({
          pageNumber: page,
          pageSize: 6,
          searchKey: "",
        })
      );
    }
  };

  const handleCustomPageSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(customPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        // handlePageChange(pageNumber);
      } else {
        // Optionally show a message if the page number is invalid
        alert(`Please enter a page number between 1 and ${totalPages}`);
      }
      setCustomPage("");
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Adjust startPage if we're near the end of the total pages
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    // Only include the first page if currently on the last page
    if (currentPage === totalPages && startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("..."); // Add ellipsis for gap
      }
    }

    // Add main page numbers within the range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show the last page if not included
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("..."); // Add ellipsis if there’s a gap
      }
      pages.push(totalPages); // Add the last page
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-4 px-3 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold border-2 border-[#DFE3E8] cursor-pointer h-8 rounded-md flex items-center justify-center"
        >
          <IoIosArrowBack color="#C4CDD5" />
        </button>
        <div className="flex items-center gap-2 rounded-md h-8">
          {generatePageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <div
                key={index}
                onClick={() => handlePageChange(page)}
                className={`font-extrabold text-center text-xs w-10 p-2 px-3 border-2 border-[#DFE3E8] cursor-pointer rounded-md ${
                  page === currentPage ? "text-[#095F59]" : "text-[#A4A4A4]"
                }`}
                style={{
                  border: `${page === currentPage ? "2px solid #095F59" : ""}`,
                }}
              >
                {page}
              </div>
            ) : (
              <div
                key={index}
                className="font-semibold text-center text-[#159AFF] w-10 text-xs p-2 px-3 border border-[#E3E3E3]"
              >
                {page}
              </div>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="py-4 px-3 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold border-2 border-[#DFE3E8] cursor-pointer h-8 rounded-md flex items-center justify-center"
        >
          <IoIosArrowForward color="#C4CDD5" />
        </button>
      </div>
      <input
        type="number"
        value={customPage}
        onChange={(e) => setCustomPage(e.target.value)}
        onKeyPress={handleCustomPageSubmit}
        placeholder="Go to page"
        className="ml-4 p-1 pl-2 border border-[#E3E3E3] text-xs w-24 h-8"
      />
    </div>
  );
};

export { Pagination };
