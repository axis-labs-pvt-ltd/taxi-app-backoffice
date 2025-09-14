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
        <p>{row.vehicleModelId.brand + " " + row.vehicleModelId.modelName}</p>
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
      render: (row) => <p>{row.actualTotalDistance.toFixed(2)} Km</p>,
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
        // <div className="flex items-center gap-5">
        //   <FaRegEdit
        //     className="cursor-pointer"
        //     size={16}
        //     onClick={() => {
        //       handleFetchVehiclesByModelAndDate(
        //         row.vehicleModelId.id,
        //         row.tourDate.split("T")[0]
        //       );
        //       setInquiryId(row.id ?? null);
        //     }}
        //   />
        //   <RiDeleteBinLine
        //     className="cursor-pointer"
        //     size={16}
        //     // onClick={() => {
        //     //   setEditingService(row);
        //     //   setIsDeleteServiceOpen(true);
        //     // }}
        //   />
        // </div>
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
              onSelect={(e) => {
                e.preventDefault(); // prevent default to ensure it doesn’t misfire
                handleFetchVehiclesByModelAndDate(
                  row.vehicleModelId.id,
                  row.tourDate.split("T")[0]
                );
                setInquiryId(row.id ?? null);
              }}
            >
              Assign Vehicle
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // prevent default to ensure it doesn’t misfire
                setIsUpdateDistanceModalOpen(true);
                setInquiryId(row.id ?? null);
              }}
            >
              Update Actual Distance
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // prevent default to ensure it doesn’t misfire
                handleUpdateInquiryStatus("confirmed", row.id ?? "");
              }}
            >
              Confirm
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // prevent default to ensure it doesn’t misfire
                handleUpdateInquiryStatus("cancelled", row.id ?? "");
              }}
            >
              Cancel
            </DropdownMenuItem>
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
  } = useInquiries();

  return (
    <div>
      <SubHeader
        topic="Customer Inquiries"
        subline="Add, view and edit customer inquiries in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
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
