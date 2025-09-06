import { FaRegEdit } from "react-icons/fa";
import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import { ExtraServicePaginatedDataType } from "../../types/ExtraServices.types";
import { RiDeleteBinLine } from "react-icons/ri";
import useExtraServices from "../../hooks/useExtraServices";
import AddExtraService from "../../components/ExtraServices/AddExtraService";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

const ExtraServices = () => {
  const headers: TableHeaderType<ExtraServicePaginatedDataType>[] = [
    { key: "name", label: "Service" },
    { key: "price", label: "price" },
    {
      key: "isFree",
      label: "Available",
      render: (row) => <p>{row.isFree ? "Available" : "Unavailable"}</p>,
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
              setEditingService(row); // Set selected brand for editing
              setIsAddServiceOpen(true); // Open modal
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingService(row);
              setIsDeleteServiceOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const {
    extraServicesPaginated,
    currentPage,
    SearchInput,
    isAddServiceOpen,
    setIsAddServiceOpen,
    editingService,
    setEditingService,
    onSubmit,
    isDeleteServiceOpen,
    setIsDeleteServiceOpen,
    isFree,
    setIsFree,
    deleteExtraServiceSuccess,
    handleDeleteService,
  } = useExtraServices();

  return (
    <div>
      <SubHeader
        topic="Extra Services"
        subline="Add, view and edit your services in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Service"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingService(undefined); // Reset for adding new brand
              setIsAddServiceOpen(true);
            }}
          />
        </div>
        <TableNew<ExtraServicePaginatedDataType>
          headers={headers}
          data={extraServicesPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={extraServicesPaginated.loading}
          currentPage={currentPage}
          totalPages={extraServicesPaginated.data?.totalPages}
          type="vehicles"
        />
      </div>
      {isAddServiceOpen && (
        <AddExtraService
          setIsAddVehicleOpen={setIsAddServiceOpen}
          initialData={editingService}
          onSubmit={onSubmit}
          isFree={isFree}
          setIsFree={setIsFree}
        />
      )}

      {isDeleteServiceOpen && editingService && (
        <DeleteDialog
          title="Service"
          setIsDialogOpen={setIsDeleteServiceOpen}
          serviceToBeDelete={editingService}
          buttonTitle="Delete Service"
          handleDelete={handleDeleteService}
          item="service"
          loading={deleteExtraServiceSuccess.loading}
        />
      )}
    </div>
  );
};

export default ExtraServices;
