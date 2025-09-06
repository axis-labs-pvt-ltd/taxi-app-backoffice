import { FaRegEdit } from "react-icons/fa";
import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import { DriversPaginatedDataType } from "../../types/Drivers.types";
import { RiDeleteBinLine } from "react-icons/ri";
import useDrivers from "../../hooks/useDrivers";
import AddDriver from "../../components/Drivers/AddDriver";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

const Drivers = () => {
  const headers: TableHeaderType<DriversPaginatedDataType>[] = [
    { key: "fullName", label: "Name" },
    { key: "mobileNo", label: "Mobile" },
    {
      key: "dateOfBirth",
      label: "DOB",
      render: (row) => <p>{row.dateOfBirth.split("T")[0]}</p>,
    },
    {
      key: "joinDate",
      label: "Joined Date",
      render: (row) => <p>{row.dateOfBirth.split("T")[0]}</p>,
    },
    { key: "salary", label: "Salary" },
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
              setEditingDriver(row); // Set selected brand for editing
              setIsAddDriverOpen(true); // Open modal
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setEditingDriver(row);
              setIsDeleteDriverOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const {
    driversPaginated,
    currentPage,
    SearchInput,
    isAddDriverOpen,
    setIsAddDriverOpen,
    editingDriver,
    setEditingDriver,
    isDeleteDriverOpen,
    setIsDeleteDriverOpen,
    driverStatus,
    driverTypes,
    onSubmit,
    handleDeleteDriver,
    deleteDriverSuccess,
  } = useDrivers();

  return (
    <div>
      <SubHeader
        topic="Drivers"
        subline="Add, view and edit your drivers in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Driver"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingDriver(undefined); // Reset for adding new brand
              setIsAddDriverOpen(true);
            }}
          />
        </div>
        <TableNew<DriversPaginatedDataType>
          headers={headers}
          data={driversPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={driversPaginated.loading}
          currentPage={currentPage}
          totalPages={driversPaginated.data?.totalPages}
          type="drivers"
        />
      </div>
      {isAddDriverOpen && (
        <AddDriver
          setIsAddDriverOpen={setIsAddDriverOpen}
          initialData={editingDriver}
          driverTypes={driverTypes}
          driverStatus={driverStatus}
          onSubmit={onSubmit}
        />
      )}

      {isDeleteDriverOpen && editingDriver && (
        <DeleteDialog
          title="Driver"
          setIsDialogOpen={setIsDeleteDriverOpen}
          driverToBeDelete={editingDriver}
          buttonTitle="Delete Driver"
          handleDelete={handleDeleteDriver}
          item="driver"
          loading={deleteDriverSuccess.loading}
        />
      )}
    </div>
  );
};

export default Drivers;
