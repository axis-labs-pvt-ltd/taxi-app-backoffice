import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import { InquiryPaginatedDataType } from "../../types/Inquiries.types";
import useInquiries from "../../hooks/useInquiries";
import AssignVehicleModal from "../../components/Inquiries/AssignVehicleModal";
import UpdateActualDistance from "../../components/Inquiries/UpdateActualDistance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import UpdateMeterValues from "../../components/Inquiries/UpdateMeterValues";
import InquiryView from "../../components/Inquiries/InquiryView";
import { pdf } from "@react-pdf/renderer";
import InquiryInvoice from "../../components/PDFs/InquiryInvoice";
import AddCosts from "../../components/Inquiries/AddCost";
import AddDiscount from "../../components/Inquiries/AddDiscount";
import DownloadWithDateRange from "../../components/Reusable/DownloadWithDateRange";
import useProfitReport from "../../hooks/useProfitReport";
import { ProfitReportType } from "../../types/Reports.types";
import ProfitCostReportPDF from "../../components/PDFs/ProfitReport";
import { useEffect } from "react";

const Inquiries = () => {
  const headers: TableHeaderType<InquiryPaginatedDataType>[] = [
    { key: "fullName", label: "Customer" },
    { key: "phone", label: "Contact No" },
    {
      key: "tourDate",
      label: "Date",
      render: (row) => <p>{row.tourDate.split("T")[0]}</p>,
    },
    {
      key: "vehicleModelId",
      label: "Vehicle",
      render: (row) => (
        <p>{row.vehicleModelId?.brand + " " + row.vehicleModelId?.modelName}</p>
      ),
    },
    {
      key: "vehicleAssigned",
      label: "Assigned Vehicle",
      render: (row) => (
        <p className="uppercase">
          {row.vehicleAssigned?.plateNumber
            ? row.vehicleAssigned?.plateNumber
            : "---"}
        </p>
      ),
    },
    {
      key: "totalDistance",
      label: "Distance",
      render: (row) => <p>{row.totalDistance.toFixed(2)} Km</p>,
    },
    {
      key: "actualTotalDistance",
      label: "Actual Distance",
      render: (row) => (
        <p>
          {row.actualTotalDistance
            ? row.actualTotalDistance.toFixed(2) + "Km"
            : "---"}{" "}
        </p>
      ),
    },
    {
      key: "estimatedPrice",
      label: "Estimated Price",
      render: (row) => <p>Rs. {row.estimatedPrice.toFixed(2)}</p>,
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
                  handleFetchVehiclesByModelAndDate(
                    row.vehicleModelId.id,
                    row.tourDate.split("T")[0]
                  );
                  setInquiryId(row.id ?? null);
                }}
              >
                Assign Vehicle
              </DropdownMenuItem>
            )}

            {row.status !== "completed" && row.status === "confirmed" && (
              <DropdownMenuItem
                onSelect={() => {
                  handleFetchMetersByInquiry(row.id ?? "");
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

            {row.status === "completed" &&  (
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

            {/* <DropdownMenuItem
              onSelect={() => {
                handleUpdateInquiryStatus("confirmed", row.id ?? "");
              }}
            >
              Confirm
            </DropdownMenuItem> */}
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
                onSelect={() => {
                  handleUpdateInquiryStatus("cancelled", row.id ?? "");
                }}
              >
                Cancel
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const {
    currentPage,
    inquiriesPaginated,
    SearchInput,
    vehiclesByModelAndDate,
    handleFetchVehiclesByModelAndDate,
    isAssignVehicleModalOpen,
    setIsAssignVehicleModalOpen,
    setInquiryId,
    assignVehicle,
    isUpdateDistanceModalOpen,
    setIsUpdateDistanceModalOpen,
    handleUpdateActualDistance,
    handleUpdateInquiryStatus,
    isUpdateMeterValuesModalOpen,
    setIsUpdateMeterValuesModalOpen,
    handleUpdateMeterValues,
    handleFetchMetersByInquiry,
    metersByInquiry,
    isInquiryViewOpen,
    setIsInquiryViewOpen,
    selectedInquiry,
    setselectedInquiry,
    costCategories,
    handleFetchCostCategories,
    isAddCostsOpen,
    setIsAddCostsOpen,
    handleAddCosts,
    isAddDiscountOpen,
    setIsAddDiscountOpen,
    handleUpdateDiscount,
  } = useInquiries();

  const {
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
  } = useProfitReport();

  const downloadInvoice = async (inquiry: InquiryPaginatedDataType) => {
    const blob = await pdf(<InquiryInvoice inquiry={inquiry} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${inquiry.fullName ?? "unknown"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadProfitReport = async (profitReport: ProfitReportType) => {
    const blob = await pdf(
      <ProfitCostReportPDF
        reports={profitReport.reports}
        summary={profitReport.summary}
        startDate={startDate?.toString()}
        endDate={endDate?.toString()}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Profit-Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (profitReport.data !== null) {
      downloadProfitReport(profitReport.data);
      handleClearProfitReport();
    }
  }, [profitReport.data]);

  return (
    <div>
      <SubHeader
        topic="Customer Inquiries"
        subline="Add, view and edit customer inquiries in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <div className="flex items-center justify-end w-full">
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
          </div>
        </div>
        <TableNew<InquiryPaginatedDataType>
          headers={headers}
          data={inquiriesPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={inquiriesPaginated.loading}
          currentPage={currentPage}
          totalPages={inquiriesPaginated.data?.totalPages}
          type="inquiries"
        />
      </div>

      {isAssignVehicleModalOpen && (
        <AssignVehicleModal
          setIsAssignVehicleModalOpen={setIsAssignVehicleModalOpen}
          vehiclesByModelAndDate={vehiclesByModelAndDate}
          assignVehicle={assignVehicle}
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
        <InquiryView
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
          isReturnTour={selectedInquiry?.isReturnTour}
          estimatedPrice={selectedInquiry?.estimatedPrice}
          finalPrice={selectedInquiry?.finalPrice}
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

export default Inquiries;
