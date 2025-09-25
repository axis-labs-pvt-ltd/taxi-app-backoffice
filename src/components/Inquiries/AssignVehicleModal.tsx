import React from "react";
import { ReduxState } from "../../types/Redux.types";
import {
  AssignVehicleType,
  VehiclesByModelAndDateType,
} from "../../types/Vehicle.types";
import { Button } from "../Reusable/Button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { assignVehicleSchema } from "../../schemas/Vehicle.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface AssignVehicleModalProps {
  vehiclesByModelAndDate: ReduxState<VehiclesByModelAndDateType[] | null>;
  setIsAssignVehicleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assignVehicle: (data: AssignVehicleType) => void;
}

const AssignVehicleModal: React.FC<AssignVehicleModalProps> = ({
  vehiclesByModelAndDate,
  setIsAssignVehicleModalOpen,
  assignVehicle,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignVehicleType>({
    resolver: zodResolver(assignVehicleSchema),
  });

  const handleFormSubmit = (data: AssignVehicleType) => {
    assignVehicle(data);
    setIsAssignVehicleModalOpen(false);
    reset();
  };

  const vehicleOptions: { value: string; label: string }[] = Array.isArray(
    vehiclesByModelAndDate?.data
  )
    ? vehiclesByModelAndDate.data.map((vehicle) => ({
        value: vehicle.id,
        label: vehicle.plateNumber,
      }))
    : [];

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div
          className="w-[850px] h-[330px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                Assign a Vehicle
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-5 space-y-8"
            >
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Vehicle
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="vehicleId"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Select
                          options={vehicleOptions} // from backend or hardcoded enum
                          placeholder="Select a vehicle"
                          value={
                            vehicleOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          }
                          isClearable
                          className="capitalize"
                        />
                        {errors.vehicleId && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.vehicleId?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  type="button"
                  onClick={() => setIsAssignVehicleModalOpen(false)}
                />
                <Button
                  children="Assign Vehicle"
                  variant="primary"
                  size="small"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignVehicleModal;
