import { FaRegEdit } from "react-icons/fa";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import { RiDeleteBinLine } from "react-icons/ri";
import SubHeader from "../../components/SubHeader";
import { Button } from "../../components/Reusable/Button";
import useVehicles from "../../hooks/useVehicles";
import { VehiclePaginatedDataType } from "../../types/Vehicle.types";
import AddVehicle from "../../components/Vehicles/AddVehicle";
import DeleteDialog from "../../components/Reusable/DeleteDialog";
import { useEffect } from "react";
import { ToggleButton } from "../../components/Reusable/ToggleButton";

const Vehicles = () => {
  const handleToggle = (id: string, newState: boolean) => {
    handleUpdateVehicleStatus(id, newState);
  };

  const headers: TableHeaderType<VehiclePaginatedDataType>[] = [
    {
      key: "plateNumber",
      label: "Plate Number",
      render: (row) => <p className="uppercase">{row.plateNumber}</p>,
    },
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
    {
      key: "model",
      label: "Rate Card",
      render: (row) => <p>{row.model?.rateCard}</p>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <ToggleButton
          isButtonActive={row.status === "available" ? true : false}
          onToggle={(newState) => handleToggle(row.id, newState)}
        />
      ),
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
    // selectedFiles,
    // handleClearImages,
    // dragActive,
    // handleDragOver,
    // handleDragLeave,
    // handleDrop,
    // handleFileChange,
    // imageUrls,
    // setSelectedFiles,
    handleCancel,
    handleUpdateVehicleStatus,
  } = useVehicles();

  // useEffect(() => {
  //   setSelectedFiles(
  //     editingVehicle?.images?.map((image) => {
  //       if (typeof image === "string") {
  //         return {
  //           name: "",
  //           previewUrl: image,
  //           file: null as unknown as File,
  //         };
  //       } else {
  //         return {
  //           name: "",
  //           previewUrl: image ?? "",
  //           file: null as unknown as File,
  //         };
  //       }
  //     }) ?? []
  //   );
  // }, [editingVehicle?.images, setIsAddVehicleOpen]);

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
          handleCancel={handleCancel}
          initialData={editingVehicle}
          onSubmit={onSubmit}
          vehicleModelsEssentials={vehicleModelsEssentials}
          // selectedFiles={selectedFiles}
          // handleClearImages={handleClearImages}
          // dragActive={dragActive}
          // handleDragOver={handleDragOver}
          // handleDragLeave={handleDragLeave}
          // handleDrop={handleDrop}
          // handleFileChange={handleFileChange}
          // imageUrls={imageUrls}
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
