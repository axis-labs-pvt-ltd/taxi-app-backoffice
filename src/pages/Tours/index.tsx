import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import useTours from "../../hooks/useTours";
import { ToursDataType } from "../../types/Tours.types";
import { FaRegEdit } from "react-icons/fa";
import AddTour from "../../components/Tours/AddTour";
import useFileUpload from "../../hooks/useFileUpload";
import { useEffect } from "react";

const Tours = () => {
  const headers: TableHeaderType<ToursDataType>[] = [
    { key: "location", label: "Location" },
    {
      key: "days",
      label: "Days",
    },
    {
      key: "nights",
      label: "Nights",
    },
    { key: "rating", label: "Rating" },
    {
      key: "price",
      label: "Price ",
      render: (row) => <p>Rs. {row.price.toFixed(2)}</p>,
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
              setEditingTour(row); // Set selected brand for editing
              setIsAddTourOpen(true); // Open modal
            }}
          />
          <RiDeleteBinLine
            className="cursor-pointer"
            size={16}
            // onClick={() => {
            //   setEditingVehicle(row);
            //   setIsDeleteVehicleOpen(true);
            // }}
          />
        </div>
      ),
    },
  ];

  const {
    currentPage,
    toursPaginated,
    SearchInput,
    isAddTourOpen,
    setIsAddTourOpen,
    editingTour,
    setEditingTour,
    onSubmit,
  } = useTours();

  useEffect(() => {
    // setValue("isInventoryTrack", true);
    // setValue("isManufactureDateBatch", true);
    // setValue("isTrackExpireDate", true);
    setSelectedFiles(
      editingTour?.images?.map((image) => {
        if (typeof image === "string") {
          return {
            name: "",
            previewUrl: image,
            file: null as unknown as File,
          };
        } else {
          return {
            name: "",
            previewUrl: image ?? "",
            file: null as unknown as File,
          };
        }
      }) ?? []
    );
  }, [editingTour?.images]);

  // const {
  //   selectedImage,
  //   handleClearImage,
  //   dragActive,
  //   handleDragOver,
  //   handleDragLeave,
  //   handleDrop,
  //   handleFileChange,
  //   imageName,
  // } = useFileUpload();

  const {
    selectedFiles,
    handleClearImages,
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    imageUrls,
    setSelectedFiles,
  } = useFileUpload();

  return (
    <div>
      <SubHeader
        topic="Tours"
        subline="Add, view and edit your tours in one place"
      />
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {SearchInput}
          <Button
            children="Add Tour"
            variant="primary"
            size="small"
            onClick={() => {
              setEditingTour(undefined); // Reset for adding new brand
              setIsAddTourOpen(true);
            }}
          />
        </div>
        <TableNew<ToursDataType>
          headers={headers}
          data={toursPaginated.data?.data || []}
          headerStyle="default"
          cellStyle="default"
          bodyBackgroundColor="bg-gray-50"
          isPaginated={true}
          loading={toursPaginated.loading}
          currentPage={currentPage}
          totalPages={toursPaginated.data?.totalPages}
          type="tours"
        />
      </div>
      {isAddTourOpen && (
        <AddTour
          setIsAddTourOpen={setIsAddTourOpen}
          initialData={editingTour}
          onSubmit={onSubmit}
          selectedFiles={selectedFiles}
          handleClearImages={handleClearImages}
          dragActive={dragActive}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          imageUrls={imageUrls}
        />
      )}

      {/* {isDeleteUserOpen && editingUser && (
        <DeleteDialog
          title="User"
          setIsDialogOpen={setIsDeleteUserOpen}
          userToBeDelete={editingUser}
          buttonTitle="Delete User"
          handleDelete={handleDeleteUser}
          item="user"
          loading={deleteUserSuccess.loading}
        />
      )} */}
    </div>
  );
};

export default Tours;
