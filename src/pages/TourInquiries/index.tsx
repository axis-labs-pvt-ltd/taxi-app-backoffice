import { CiMenuKebab } from "react-icons/ci";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import useTourInquiries from "../../hooks/useTourInquiries";
import { TourInquiryDataType } from "../../types/TourInquiry.types";
import { Button } from "../../components/Reusable/Button";
import AssignVehicleTourInquiry from "../../components/Tours/AssignVehicleTourInquiry";
import UpdateActualDistance from "../../components/Inquiries/UpdateActualDistance";
import AddCosts from "../../components/Inquiries/AddCost";
import UpdateMeterValues from "../../components/Inquiries/UpdateMeterValues";
import AddDiscount from "../../components/Inquiries/AddDiscount";
import TourInquiryView from "../../components/Tours/TourInquiryView";
import TourInquiryInvoice from "../../components/PDFs/TourInquiryInvoice";
import { pdf } from "@react-pdf/renderer";

const TourInquiries = () => {
  const headers: TableHeaderType<TourInquiryDataType>[] = [
    { key: "fullName", label: "Customer" },
    { key: "phone", label: "Contact No" },
    {
      key: "bookingDate",
      label: "Date",
      render: (row) => <p>{row.bookingDate.split("T")[0]}</p>,
    },
    {
      key: "travelDate",
      label: "Travel Date",
      render: (row) => <p>{row.travelDate.split("T")[0]}</p>,
    },
    {
      key: "vehicleAssigned",
      label: "Assigned Vehicle",
      render: (row) => (
        <p>
          {row.vehicleAssigned?.plateNumber
            ? row.vehicleAssigned?.plateNumber
            : "---"}
        </p>
      ),
    },
    {
      key: "finalPrice",
      label: "Final Price",
      render: (row) => (
        <p>{row.finalPrice ? "Rs. " + row.finalPrice.toFixed(2) : "---"}</p>
      ),
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: null,
      label: "Actions",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1">
              <CiMenuKebab className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => {
                setselectedInquiry(row);
                setIsInquiryViewOpen(true);
              }}
            >
              View
            </DropdownMenuItem>

            {row.status !== "completed" && (
              <DropdownMenuItem
                onSelect={() => {
                  handleGetVehicleModels();
                  setIsAssignVehicleModalOpen(true);
                  setInquiryId(row.id ?? null);
                  setDate(row.travelDate.split("T")[0]);
                }}
              >
                Assign Vehicle
              </DropdownMenuItem>
            )}

            {row.status !== "completed" && row.status === "confirmed" && (
              <DropdownMenuItem
                onSelect={() => {
                  handleFetchMetersByTourInquiry(row.id ?? "");
                  setInquiryId(row.id ?? null);
                }}
              >
                Update Meter Values
              </DropdownMenuItem>
            )}

            {row.status !== "completed" && row.status === "confirmed" && (
              <DropdownMenuItem
                onSelect={() => {
                  setIsUpdateDistanceModalOpen(true);
                  setInquiryId(row.id ?? null);
                }}
              >
                Update Actual Distance
              </DropdownMenuItem>
            )}

            {/* <DropdownMenuItem
              onSelect={() => {
                handleUpdateInquiryStatus("confirmed", row.id ?? "");
              }}
            >
              Confirm
            </DropdownMenuItem> */}

            {row.status === "completed" && !row.discount && (
              <DropdownMenuItem
                onSelect={() => {
                  setselectedInquiry(row);
                  setIsAddDiscountOpen(true);
                  setInquiryId(row.id ?? null);
                }}
              >
                Add Discount
              </DropdownMenuItem>
            )}

            {row.status === "completed" && !row.costId && (
              <DropdownMenuItem
                onSelect={() => {
                  setIsAddCostsOpen(true);
                  setInquiryId(row.id ?? null);
                  handleFetchCostCategories();
                }}
              >
                Add Costs
              </DropdownMenuItem>
            )}

            {row.status === "completed" && (
              <DropdownMenuItem
                onSelect={() => {
                  downloadInvoice(row);
                }}
              >
                Download Invoice
              </DropdownMenuItem>
            )}
            {row.status !== "cancelled" && row.status !== "completed" && (
              <DropdownMenuItem
              // onSelect={() => {
              //   handleUpdateWeddingInquiryStatus("cancelled", row.id ?? "");
              // }}
              >
                Cancel
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const downloadInvoice = async (inquiry: TourInquiryDataType) => {
    const blob = await pdf(<TourInquiryInvoice inquiry={inquiry} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${inquiry.fullName ?? "unknown"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const {
    currentPage,
    tourInquiriesPaginated,
    SearchInput,
    handleNavigate,
    isAssignVehicleModalOpen,
    setIsAssignVehicleModalOpen,
    setInquiryId,
    setDate,
    vehicleModelsEssentials,
    handleGetVehicleModels,
    vehiclesByModelAndDate,
    assignVehicle,
    handleFetchVehiclesByModelAndDate,
    isUpdateDistanceModalOpen,
    setIsUpdateDistanceModalOpen,
    handleUpdateActualDistance,
    isAddCostsOpen,
    setIsAddCostsOpen,
    costCategories,
    handleFetchCostCategories,
    handleAddCosts,
    isUpdateMeterValuesModalOpen,
    setIsUpdateMeterValuesModalOpen,
    handleFetchMetersByTourInquiry,
    metersByInquiry,
    handleUpdateMeterValues,
    isAddDiscountOpen,
    setIsAddDiscountOpen,
    selectedInquiry,
    setselectedInquiry,
    handleUpdateDiscount,
    isInquiryViewOpen,
    setIsInquiryViewOpen,
  } = useTourInquiries();
  return (
    <div>
      <SubHeader
        topic="Tour Inquiries"
        subline="Add, view and edit tour inquiries in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          {/* <div className="flex items-center justify-end w-full">
            <div className="w-fit z-10">
              <DownloadWithDateRange
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setSelectedDateRange={setSelectedDateRange}
                handleDownload={handleDownload}
                loading={profitReport.loading}
              />
            </div>
          </div> */}
          <div className="flex items-center justify-end w-full">
            <Button
              children="Go to Tours"
              variant="primary"
              size="small"
              onClick={handleNavigate}
            />
          </div>
        </div>
        <TableNew<TourInquiryDataType>
          headers={headers}
          data={tourInquiriesPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={tourInquiriesPaginated.loading}
          currentPage={currentPage}
          totalPages={tourInquiriesPaginated.data?.totalPages}
          type="tourInquiries"
        />
      </div>

      {isAssignVehicleModalOpen && (
        <AssignVehicleTourInquiry
          setIsAssignVehicleModalOpen={setIsAssignVehicleModalOpen}
          vehicleModels={vehicleModelsEssentials}
          vehiclesByModelAndDate={vehiclesByModelAndDate}
          assignVehicle={assignVehicle}
          handleFetchVehiclesByModelAndDate={handleFetchVehiclesByModelAndDate}
        />
      )}

      {isUpdateDistanceModalOpen && (
        <UpdateActualDistance
          setIsUpdateDistanceModalOpen={setIsUpdateDistanceModalOpen}
          handleUpdateActualDistance={handleUpdateActualDistance}
        />
      )}

      {isUpdateMeterValuesModalOpen && (
        <UpdateMeterValues
          setIsUpdateMeterValuesModalOpen={setIsUpdateMeterValuesModalOpen}
          handleUpdateMeterValues={handleUpdateMeterValues}
          initialData={metersByInquiry}
        />
      )}

      {isInquiryViewOpen && (
        <TourInquiryView
          setIsInquiryViewOpen={setIsInquiryViewOpen}
          selectedInquiry={selectedInquiry}
        />
      )}

      {isAddCostsOpen && (
        <AddCosts
          setIsAddCostsOpen={setIsAddCostsOpen}
          costCategories={costCategories}
          handleAddCosts={handleAddCosts}
        />
      )}

      {isAddDiscountOpen && (
        <AddDiscount
          setIsAddDiscountOpen={setIsAddDiscountOpen}
          isReturnTour={false}
          finalPrice={selectedInquiry?.finalPrice ?? undefined}
          handleUpdateDiscount={handleUpdateDiscount}
        />
      )}

      {/* {isDeleteServiceOpen && editingService && (
        <DeleteDialog
          title="Service"
          setIsDialogOpen={setIsDeleteServiceOpen}
          serviceToBeDelete={editingService}
          buttonTitle="Delete Service"
          handleDelete={handleDeleteService}
          item="service"
          loading={deleteExtraServiceSuccess.loading}
        />
      )} */}
    </div>
  );
};

export default TourInquiries;
