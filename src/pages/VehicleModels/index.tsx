import SubHeader from "../../components/SubHeader";
import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { VehicleModelsPaginatedDataType } from "../../types/VehicleModels.types";
import useVehicleModels from "../../hooks/useVehicleModels";
import AddVehicleModel from "../../components/VehicleModels/AddVehicleModel";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

const VehicleModels = () => {
  const headers: TableHeaderType<VehicleModelsPaginatedDataType>[] = [
    { key: "modelName", label: "Model Name" },
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type" },
    {
      key: "options",
      label: "Passengers",
      render: (row) => <p>{row.options.passengerCount}</p>,
    },
    {
      key: "options",
      label: "Luggage Capacity",
      render: (row) => <p>{row.options.luggageCapacity}</p>,
    },
    {
      key: "options",
      label: "Transmission",
      render: (row) => <p>{row.options.transmission}</p>,
    },
    {
      key: "options",
      label: "Air Condition",
      render: (row) => <p>{row.options.airCondition ? "Yes" : "No"}</p>,
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
              setEditingVehicleModel(row); // Set selected brand for editing
              setIsAddVehicleModelOpen(true); // Open modal
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingVehicleModel(row);
              setIsDeleteVehicleModelOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const {
    vehicleModelsPaginated,
    currentPage,
    SearchInput,
    vehicleTypes,
    vehicleBrands,
    isAddVehicleModelOpen,
    setIsAddVehicleModelOpen,
    isAirConditioned,
    setIsAirConditioned,
    editingVehicleModel,
    setEditingVehicleModel,
    onSubmit,
    rateCards,
    isDeleteVehicleModelOpen,
    setIsDeleteVehicleModelOpen,
    handleDeleteVehicleModel,
    deleteVehicleModelSuccess,
  } = useVehicleModels();

  return (
    <div>
      <SubHeader
        topic="Vehicle Models"
        subline="Add, view and edit your vehicle Models in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Vehicle Model"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingVehicleModel(undefined); // Reset for adding new brand
              setIsAddVehicleModelOpen(true);
            }}
          />
        </div>
        <TableNew<VehicleModelsPaginatedDataType>
          headers={headers}
          data={vehicleModelsPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={vehicleModelsPaginated.loading}
          currentPage={currentPage}
          totalPages={vehicleModelsPaginated.data?.totalPages}
          type="vehicles"
        />
      </div>
      {isAddVehicleModelOpen && (
        <AddVehicleModel
          setIsAddVehicleModelOpen={setIsAddVehicleModelOpen}
          vehicleTypes={vehicleTypes}
          vehicleBrands={vehicleBrands}
          initialData={editingVehicleModel}
          onSubmit={onSubmit}
          isAirConditioned={isAirConditioned}
          setIsAirConditioned={setIsAirConditioned}
          rateCards={rateCards}
        />
      )}

      {isDeleteVehicleModelOpen && editingVehicleModel && (
        <DeleteDialog
          title="Vehicle Model"
          setIsDialogOpen={setIsDeleteVehicleModelOpen}
          vehicleModelToBeDelete={editingVehicleModel}
          buttonTitle="Delete Vehicle Model"
          handleDelete={handleDeleteVehicleModel}
          item="vehicle model"
          loading={deleteVehicleModelSuccess.loading}
        />
      )}
    </div>
  );
};

export default VehicleModels;
