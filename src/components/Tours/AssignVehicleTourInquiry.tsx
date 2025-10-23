import React, { useState } from "react";
import { Button } from "../Reusable/Button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  AssignVehicleType,
  VehiclesByModelAndDateType,
} from "../../types/Vehicle.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignVehicleSchema } from "../../schemas/Vehicle.schema";
import { ReduxState } from "../../types/Redux.types";
import { VehicleModelsEssentialType } from "../../types/VehicleModels.types";
import { RefreshCw } from "lucide-react";

interface AssignVehicleTourInquiryProps {
  setIsAssignVehicleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vehicleModels: ReduxState<VehicleModelsEssentialType[] | null>;
  vehiclesByModelAndDate: ReduxState<VehiclesByModelAndDateType[] | null>;
  assignVehicle: (data: AssignVehicleType) => void;
  handleFetchVehiclesByModelAndDate: (modelId: string) => Promise<void>;
}

const AssignVehicleTourInquiry: React.FC<AssignVehicleTourInquiryProps> = ({
  setIsAssignVehicleModalOpen,
  vehicleModels,
  vehiclesByModelAndDate,
  assignVehicle,
  handleFetchVehiclesByModelAndDate,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignVehicleType>({
    resolver: zodResolver(assignVehicleSchema),
  });

  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const handleFormSubmit = (data: AssignVehicleType) => {
    assignVehicle(data);
    setIsAssignVehicleModalOpen(false);
    reset();
  };

  const modelOptions: { value: string; label: string }[] = Array.isArray(
    vehicleModels?.data
  )
    ? vehicleModels.data.map((model) => ({
        value: model.id,
        label: model.modelName,
      }))
    : [];

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
          className="w-[850px] h-[420px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
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
              {/* Vehicle Model Selector with Reload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Vehicle Model
                  <span className="text-sm text-[#F34747]">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Select
                      options={modelOptions}
                      placeholder="Select a vehicle model"
                      value={
                        modelOptions.find(
                          (option) => option.value === selectedModelId
                        ) || null
                      }
                      onChange={(selectedOption) =>
                        setSelectedModelId(selectedOption?.value || null)
                      }
                      isClearable
                      className="capitalize"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedModelId)
                        handleFetchVehiclesByModelAndDate(selectedModelId);
                    }}
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 border"
                    title="Reload vehicles for this model"
                  >
                    {vehiclesByModelAndDate.loading ? (
                      <>
                        <div v-if="isLoading" className="custom-spinner"></div>
                      </>
                    ) : (
                      <RefreshCw size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Vehicle Selector */}
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
                        options={vehicleOptions}
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

              {/* Action Buttons */}
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

export default AssignVehicleTourInquiry;
