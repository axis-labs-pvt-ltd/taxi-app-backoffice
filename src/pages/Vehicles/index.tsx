import { FaRegEdit } from "react-icons/fa";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import { RiDeleteBinLine } from "react-icons/ri";
import SubHeader from "../../components/SubHeader";
import { Button } from "../../components/Reusable/Button";
import useVehicles from "../../hooks/useVehicles";
import { VehiclePaginatedDataType } from "../../types/Vehicle.types";
import AddVehicle from "../../components/Vehicles/AddVehicle";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

const Vehicles = () => {
  const headers: TableHeaderType<VehiclePaginatedDataType>[] = [
    { key: "plateNumber", label: "Plate Number" },
    {
      key: "model",
      label: "Brand",
      render: (row) => <p>{row.model?.brand}</p>,
    },
    {
      key: "model",
      label: "Model",
      render: (row) => <p>{row.model?.modelName}</p>,
    },
    { key: "status", label: "Status" },
    {
      key: null,
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-5">
          <FaRegEdit
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingVehicle(row); // Set selected brand for editing
              setIsAddVehicleOpen(true); // Open modal
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingVehicle(row);
              setIsDeleteVehicleOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const {
    vehiclesPaginated,
    currentPage,
    SearchInput,
    isAddVehicleOpen,
    setIsAddVehicleOpen,
    editingVehicle,
    setEditingVehicle,
    onSubmit,
    isDeleteVehicleOpen,
    setIsDeleteVehicleOpen,
    deleteVehicleSuccess,
    handleDeleteVehicle,
    vehicleModelsEssentials,
  } = useVehicles();

  return (
    <div>
      <SubHeader
        topic="Vehicles"
        subline="Add, view and edit your vehicles in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Vehicle"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingVehicle(undefined); // Reset for adding new brand
              setIsAddVehicleOpen(true);
            }}
          />
        </div>
        <TableNew<VehiclePaginatedDataType>
          headers={headers}
          data={vehiclesPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={vehiclesPaginated.loading}
          currentPage={currentPage}
          totalPages={vehiclesPaginated.data?.totalPages}
          type="vehicles"
        />
      </div>
      {isAddVehicleOpen && (
        <AddVehicle
          setIsAddVehicleOpen={setIsAddVehicleOpen}
          initialData={editingVehicle}
          onSubmit={onSubmit}
          vehicleModelsEssentials={vehicleModelsEssentials}
        />
      )}

      {isDeleteVehicleOpen && editingVehicle && (
        <DeleteDialog
          title="Vehicle"
          setIsDialogOpen={setIsDeleteVehicleOpen}
          vehicleToBeDelete={editingVehicle}
          buttonTitle="Delete Vehicle"
          handleDelete={handleDeleteVehicle}
          item="vehicle"
          loading={deleteVehicleSuccess.loading}
        />
      )}
    </div>
  );
};

export default Vehicles;
