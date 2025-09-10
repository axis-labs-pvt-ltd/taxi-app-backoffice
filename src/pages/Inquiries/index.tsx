import { RiDeleteBinLine } from "react-icons/ri";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import { InquiryPaginatedDataType } from "../../types/Inquiries.types";
import useInquiries from "../../hooks/useInquiries";
import { FaRegEdit } from "react-icons/fa";
import AssignVehicleModal from "../../components/Inquiries/AssignVehicleModal";

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
      key: "estimatedPrice",
      label: "Estimated Price",
      render: (row) => <p>Rs. {row.estimatedPrice.toFixed(2)}</p>,
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: null,
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-5">
          <FaRegEdit
            className="cursor-pointer"
            size={16}
            onClick={() => {
              handleFetchVehiclesByModelAndDate(
                row.vehicleModelId.id,
                row.tourDate.split("T")[0]
              );
              setInquiryId(row.id ?? null);
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            // onClick={() => {
            //   setEditingService(row);
            //   setIsDeleteServiceOpen(true);
            // }}
          />
        </div>
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
          type="vehicles"
        />
      </div>

      {isAssignVehicleModalOpen && (
        <AssignVehicleModal
          setIsAssignVehicleModalOpen={setIsAssignVehicleModalOpen}
          vehiclesByModelAndDate={vehiclesByModelAndDate}
          assignVehicle={assignVehicle}
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
