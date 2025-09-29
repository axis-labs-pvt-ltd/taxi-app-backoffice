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
import useWeddingInquiries from "../../hooks/useWeddingInquiries";
import { WeddingInquiryPaginatedDataType } from "../../types/WeddingInquiry.types";
import AssignVehicleModal from "../../components/Inquiries/AssignVehicleModal";
import UpdateActualDistance from "../../components/Inquiries/UpdateActualDistance";
import UpdateMeterValues from "../../components/Inquiries/UpdateMeterValues";
import WeddingInquiryInvoice from "../../components/PDFs/WeddingInquiryInvoice";
import { pdf } from "@react-pdf/renderer";
import WeddingInquiryView from "../../components/WeddingInquiries/WeddingInquiryView";

const WeddingInquiries = () => {
  const headers: TableHeaderType<WeddingInquiryPaginatedDataType>[] = [
    { key: "fullName", label: "Customer" },
    { key: "phone", label: "Contact No" },
    {
      key: "bookingDate",
      label: "Date",
      render: (row) => <p>{row.bookingDate.split("T")[0]}</p>,
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
        <p>
          {row.vehicleAssigned?.plateNumber
            ? row.vehicleAssigned?.plateNumber
            : "---"}
        </p>
      ),
    },
    {
      key: "totalDistance",
      label: "Distance",
      render: (row) => (
        <p>
          {row.totalDistance ? row.totalDistance?.toFixed(2) + "Km" : "---"}{" "}
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
                setIsWeddingInquiryViewOpen(true);
              }}
            >
              View
            </DropdownMenuItem>

            {row.status !== "completed" && (
              <DropdownMenuItem
                onSelect={() => {
                  handleFetchVehiclesByModelAndDate(
                    row.vehicleModelId.id,
                    row.bookingDate.split("T")[0]
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
                  handleFetchMetersByWeddingInquiry(row.id ?? "");
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
                  handleUpdateWeddingInquiryStatus("cancelled", row.id ?? "");
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

  const downloadInvoice = async (inquiry: WeddingInquiryPaginatedDataType) => {
    const blob = await pdf(
      <WeddingInquiryInvoice inquiry={inquiry} />
    ).toBlob();

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
    weddingInquiriesPaginated,
    SearchInput,
    vehiclesByModelAndDate,
    isAssignVehicleModalOpen,
    setIsAssignVehicleModalOpen,
    handleFetchVehiclesByModelAndDate,
    assignVehicle,
    setInquiryId,
    isUpdateDistanceModalOpen,
    setIsUpdateDistanceModalOpen,
    handleUpdateTotalDistance,
    isUpdateMeterValuesModalOpen,
    setIsUpdateMeterValuesModalOpen,
    handleUpdateMeterValues,
    metersByInquiry,
    handleFetchMetersByWeddingInquiry,
    handleUpdateWeddingInquiryStatus,
    isWeddingInquiryViewOpen,
    setIsWeddingInquiryViewOpen,
    selectedInquiry,
    setselectedInquiry,
  } = useWeddingInquiries();

  return (
    <div>
      <SubHeader
        topic="Wedding Inquiries"
        subline="Add, view and edit wedding inquiries in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
        </div>
        <TableNew<WeddingInquiryPaginatedDataType>
          headers={headers}
          data={weddingInquiriesPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={weddingInquiriesPaginated.loading}
          currentPage={currentPage}
          totalPages={weddingInquiriesPaginated.data?.totalPages}
          type="weddingInquiries"
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
          handleUpdateActualDistance={handleUpdateTotalDistance}
        />
      )}

      {isUpdateMeterValuesModalOpen && (
        <UpdateMeterValues
          setIsUpdateMeterValuesModalOpen={setIsUpdateMeterValuesModalOpen}
          handleUpdateMeterValues={handleUpdateMeterValues}
          initialData={metersByInquiry}
        />
      )}

      {isWeddingInquiryViewOpen && (
        <WeddingInquiryView
          setIsWeddingInquiryViewOpen={setIsWeddingInquiryViewOpen}
          selectedInquiry={selectedInquiry}
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

export default WeddingInquiries;
