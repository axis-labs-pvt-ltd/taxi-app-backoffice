import React from "react";
import {
  CreateVehicleType,
  VehiclePaginatedDataType,
} from "../../types/Vehicle.types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import Select from "react-select";
import { Button } from "../Reusable/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "../../schemas/Vehicle.schema";
import { ReduxState } from "../../types/Redux.types";
import { VehicleModelsEssentialType } from "../../types/VehicleModels.types";

interface AddVehicleProps {
  setIsAddVehicleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: VehiclePaginatedDataType | undefined;
  vehicleModelsEssentials: ReduxState<VehicleModelsEssentialType[] | null>;
  onSubmit: (data: CreateVehicleType, id?: string) => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({
  setIsAddVehicleOpen,
  initialData,
  vehicleModelsEssentials,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateVehicleType>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          modelId: initialData.model.id,
          status:
            initialData.status === "available" ||
            initialData.status === "booked" ||
            initialData.status === "not available"
              ? initialData.status
              : "available",
        }
      : {
          modelId: "",
          plateNumber: "",
          status: "available",
        },
  });

  const handleFormSubmit = (data: CreateVehicleType) => {
    if (initialData?.id) {
      onSubmit(data, initialData.id); // Pass ID for update
    } else {
      onSubmit(data);
    }
    setIsAddVehicleOpen(false);
    reset();
  };

  const vehicleModelOptions: { value: string; label: string }[] | undefined =
    vehicleModelsEssentials?.data?.map((type) => ({
      value: type.id,
      label: type.modelName,
    })) as { value: string; label: string }[];

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div
          className="w-[850px] h-[430px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                {initialData ? "Edit Vehicle" : "Add Vehicle"}
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
                    Vehicle Model
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="modelId"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={vehicleModelOptions} // from backend or hardcoded enum
                          placeholder="Select a vehicle model"
                          value={
                            vehicleModelOptions.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          }
                          isClearable
                          className="capitalize"
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              <Controller
                name="plateNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Plate Number"
                    mandotary
                    placeholder="Plate Number"
                    error={errors["plateNumber"]?.message}
                    width="w-full"
                  />
                )}
              />

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  onClick={() => setIsAddVehicleOpen(false)}
                />
                <Button
                  children={initialData ? "Update Vehicle" : "Add Vehicle"}
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

export default AddVehicle;
