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
// import ImageUpload from "../Reusable/ImageUpload";
// import { SelectedFile } from "../../hooks/useFileUpload";

const ownership = ["Own", "Third-Party"];

interface AddVehicleProps {
  initialData: VehiclePaginatedDataType | undefined;
  vehicleModelsEssentials: ReduxState<VehicleModelsEssentialType[] | null>;
  onSubmit: (data: CreateVehicleType, id?: string) => void;
  // selectedFiles: SelectedFile[];
  // handleClearImages: () => void;
  // dragActive: boolean;
  // handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  // handleDragLeave: () => void;
  // handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  // handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // imageUrls: {
  //   url: string;
  //   fileName: string;
  // }[];
  handleCancel: () => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({
  initialData,
  vehicleModelsEssentials,
  onSubmit,
  // selectedFiles,
  // handleClearImages,
  // dragActive,
  // handleDragOver,
  // handleDragLeave,
  // handleDrop,
  // handleFileChange,
  // imageUrls,
  handleCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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
          ownership: "Own",
          status: "available",
        },
  });

  const ownershipType = watch("ownership");

  const handleFormSubmit = (data: CreateVehicleType) => {
    let payload;
    if (initialData) {
      payload = {
        ...data,
        // images: [
        //   ...(initialData.images ?? []),
        //   ...imageUrls.map((img) => img.url),
        // ],
      };
    } else {
      payload = {
        ...data,
        // images: imageUrls.map((img) => img.url),
      };
    }
    if (initialData?.id) {
      onSubmit(payload, initialData.id); // Pass ID for update
    } else {
      onSubmit(payload);
    }
    handleCancel();
    reset();
  };

  const vehicleModelOptions: { value: string; label: string }[] | undefined =
    vehicleModelsEssentials?.data?.map((type) => ({
      value: type.id,
      label: type.modelName,
    })) as { value: string; label: string }[];

  const ownershipOptions: { value: string; label: string }[] | undefined =
    ownership?.map((type) => ({
      value: type,
      label: type,
    })) as { value: string; label: string }[];

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
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
                          <p className="text-red-500 text-xs mt-1">
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
              <Controller
                name="year"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Vehicle year"
                    mandotary
                    placeholder="Vehicle year"
                    error={errors["year"]?.message}
                    width="w-full"
                  />
                )}
              />
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Vehicle Ownership
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="ownership"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={ownershipOptions}
                          placeholder="Select vehicle ownership"
                          value={
                            ownershipOptions.find(
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
                          <p className="text-red-500 text-xs mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              {ownershipType === "Third-Party" && (
                <>
                  <Controller
                    name="ownerName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Owner name"
                        mandotary
                        placeholder="Owner name"
                        error={errors["ownerName"]?.message}
                        width="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="ownerPhone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Owner phone"
                        mandotary
                        placeholder="Owner phone"
                        error={errors["ownerPhone"]?.message}
                        width="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="ownerAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Owner address"
                        mandotary
                        placeholder="Owner address"
                        error={errors["ownerAddress"]?.message}
                        width="w-full"
                      />
                    )}
                  />
                </>
              )}

              {/* <div>
                <label className="text-sm font-semibold">Description</label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      placeholder="Enter detailed description"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                  )}
                />
              </div>

              <ImageUpload
                selectedFiles={selectedFiles}
                dragActive={dragActive}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                handleClearImages={handleClearImages}
              /> */}

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  onClick={() => handleCancel()}
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
