import React from "react";
import { Button } from "./Button";
import { VehiclePaginatedDataType } from "../../types/Vehicle.types";
import { ExtraServicePaginatedDataType } from "../../types/ExtraServices.types";
import { DriversPaginatedDataType } from "../../types/Drivers.types";

interface DeleteDialogProps {
  title: string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vehicleToBeDelete?: VehiclePaginatedDataType;
  serviceToBeDelete?: ExtraServicePaginatedDataType;
  driverToBeDelete?: DriversPaginatedDataType;
  buttonTitle: string;
  handleDelete: (id: string) => void;
  item: string;
  loading?: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  setIsDialogOpen,
  vehicleToBeDelete,
  serviceToBeDelete,
  driverToBeDelete,
  buttonTitle,
  handleDelete,
  item,
  loading,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div
          className="w-[650px] h-[300px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl tetx font-bold tracking-wider capitalize">
                You're about to delete the {title} “
                {vehicleToBeDelete?.plateNumber ??
                  serviceToBeDelete?.name ??
                  driverToBeDelete?.fullName}
                ”.
              </p>
            </div>
            <div className="w-full mt-4">
              <div>
                <p className="text-sm font-medium">
                  You will no longer be able to edit this {item}. This action
                  can't be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-end mt-8">
              <Button
                children="Cancel"
                variant="secondary"
                size="medium"
                width="w-32"
                onClick={() => setIsDialogOpen(false)}
              />
              <Button
                children={loading ? "Deleting..." : buttonTitle}
                variant="primary"
                size="medium"
                onClick={() =>
                  handleDelete(
                    vehicleToBeDelete?.id ??
                      serviceToBeDelete?.id ??
                      driverToBeDelete?.id ??
                      ""
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialog;
