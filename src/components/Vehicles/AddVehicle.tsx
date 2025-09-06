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

interface AddVehicleProps {
  setIsAddVehicleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: VehiclePaginatedDataType | undefined;
  vehicleTypes: ReduxState<string[] | null>;
  onSubmit: (data: CreateVehicleType, id?: string) => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({
  setIsAddVehicleOpen,
  initialData,
  vehicleTypes,
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
          pricePerKm:
            initialData.pricePerKm !== undefined
              ? String(initialData.pricePerKm)
              : "",
          capacity:
            initialData.capacity !== undefined
              ? String(initialData.capacity)
              : "",
          status:
            initialData.status === "available" ||
            initialData.status === "booked" ||
            initialData.status === "not available"
              ? initialData.status
              : "available",
        }
      : {
          type: "",
          plateNumber: "",
          capacity: "",
          status: "available",
          brand: "",
          model: "",
          pricePerKm: "",
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

  const vehicleTypeOptions: { value: string; label: string }[] | undefined =
    vehicleTypes?.data?.map((type) => ({
      value: type,
      label: type,
    })) as { value: string; label: string }[];

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => setIsAddVehicleOpen(false)}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => setIsAddVehicleOpen(false)}
      >
        <div
          className="w-[850px] h-[630px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
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
              {/* Use Controller for the "name" field */}
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
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Vehicle Type
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={vehicleTypeOptions} // from backend or hardcoded enum
                          placeholder="Select vehicle type"
                          value={
                            vehicleTypeOptions.find(
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
              {/* Use Controller for the "description" field */}
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Brand"
                    placeholder="Brand"
                    error={errors["brand"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Model"
                    placeholder="Model"
                    error={errors["model"]?.message}
                    width="w-full"
                  />
                )}
              />

              <Controller
                name="pricePerKm"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Price Per Km"
                    placeholder="Price Per Km"
                    error={errors.pricePerKm?.message}
                    width="w-full"
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter
                      if (
                        [8, 9, 13, 27, 46].includes(e.keyCode) ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                        (e.keyCode === 65 && e.ctrlKey === true) ||
                        (e.keyCode === 67 && e.ctrlKey === true) ||
                        (e.keyCode === 86 && e.ctrlKey === true) ||
                        (e.keyCode === 88 && e.ctrlKey === true) ||
                        // Allow: numbers and numpad numbers
                        (e.keyCode >= 48 && e.keyCode <= 57) ||
                        (e.keyCode >= 96 && e.keyCode <= 105)
                      ) {
                        return;
                      }
                      // Prevent default for all other keys
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      // Ensure the value is a valid number or empty string
                      const value = e.target.value;
                      if (value === "" || !isNaN(Number(value))) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Capacity"
                    placeholder="Capacity"
                    error={errors.capacity?.message}
                    width="w-full"
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter
                      if (
                        [8, 9, 13, 27, 46].includes(e.keyCode) ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                        (e.keyCode === 65 && e.ctrlKey === true) ||
                        (e.keyCode === 67 && e.ctrlKey === true) ||
                        (e.keyCode === 86 && e.ctrlKey === true) ||
                        (e.keyCode === 88 && e.ctrlKey === true) ||
                        // Allow: numbers and numpad numbers
                        (e.keyCode >= 48 && e.keyCode <= 57) ||
                        (e.keyCode >= 96 && e.keyCode <= 105)
                      ) {
                        return;
                      }
                      // Prevent default for all other keys
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      // Ensure the value is a valid number or empty string
                      const value = e.target.value;
                      if (value === "" || !isNaN(Number(value))) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />

              <div className="w-full flex items-center justify-end gap-8 mt-8">
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
