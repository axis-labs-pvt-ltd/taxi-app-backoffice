import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "../../components/Reusable/Button";
import { TableHeaderType, TableNew } from "../../components/Reusable/TableNew";
import SubHeader from "../../components/SubHeader";
import useTours from "../../hooks/useTours";
import { ToursDataType } from "../../types/Tours.types";
import { FaRegEdit } from "react-icons/fa";
import AddTour from "../../components/Tours/AddTour";
import { useEffect } from "react";
import DeleteDialog from "../../components/Reusable/DeleteDialog";

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
            onClick={() => {
              setEditingTour(row);
              setIsDeleteTourOpen(true);
            }}
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
    handleCancel,
    selectedFiles,
    handleClearImages,
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    imageUrls,
    setSelectedFiles,
    isDeleteTourOpen,
    setIsDeleteTourOpen,
    handleTourDelete,
    deleteTourSuccess,
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
  }, [editingTour?.images, setIsAddTourOpen]);

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
          handleCancel={handleCancel}
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

      {isDeleteTourOpen && editingTour && (
        <DeleteDialog
          title="Tour"
          setIsDialogOpen={setIsDeleteTourOpen}
          tourToBeDelete={editingTour}
          buttonTitle="Delete Tour"
          handleDelete={handleTourDelete}
          item="user"
          loading={deleteTourSuccess.loading}
        />
      )}
    </div>
  );
};

export default Tours;
