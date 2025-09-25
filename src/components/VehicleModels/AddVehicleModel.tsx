import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import Select from "react-select";
import { Button } from "../Reusable/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReduxState } from "../../types/Redux.types";
import {
  CreateVehicleModelType,
  VehicleModelsPaginatedDataType,
} from "../../types/VehicleModels.types";
import { createVehicleModelSchema } from "../../schemas/VehicleModels.schema";
import { ToggleButton } from "../Reusable/ToggleButton";
import { RateCardsType } from "../../types/RateCards.types";

const transMission = ["automatic", "manual"];
const luggageCapacity = ["Limited Baggage", "Sufficient Baggage"];

interface AddVehicleProps {
  setIsAddVehicleModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vehicleTypes: ReduxState<string[] | null>;
  vehicleBrands: ReduxState<string[] | null>;
  initialData: VehicleModelsPaginatedDataType | undefined;
  onSubmit: (data: CreateVehicleModelType, id?: string) => void;
  isAirConditioned: boolean;
  setIsAirConditioned: React.Dispatch<React.SetStateAction<boolean>>;
  rateCards: ReduxState<RateCardsType[] | null>;
}

const AddVehicleModel: React.FC<AddVehicleProps> = ({
  setIsAddVehicleModelOpen,
  vehicleTypes,
  vehicleBrands,
  initialData,
  onSubmit,
  isAirConditioned,
  setIsAirConditioned,
  rateCards,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<CreateVehicleModelType>({
    resolver: zodResolver(createVehicleModelSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          options: {
            passengerCount: initialData.options.passengerCount,
            luggageCapacity: initialData.options.luggageCapacity,
            transmission: initialData.options.transmission,
            airCondition: initialData.options.airCondition,
          },
          rateCardId: initialData.rateCardId.id,
        }
      : {
          options: {
            airCondition: false,
          },
        },
  });

  useEffect(() => {
    if (initialData) {
      setIsAirConditioned(initialData?.options.airCondition);
    }
  }, []);

  const handleFormSubmit = (data: CreateVehicleModelType) => {
    const payload = {
      ...data,
      options: {
        airCondition: isAirConditioned,
        passengerCount: data.options.passengerCount,
        luggageCapacity: data.options.luggageCapacity,
        transmission: data.options.transmission,
      },
    };
    if (initialData?.id) {
      onSubmit(payload, initialData.id); // Pass ID for update
    } else {
      onSubmit(payload);
    }
    setIsAddVehicleModelOpen(false);
    reset();
  };

  const vehicleTypeOptions: { value: string; label: string }[] | undefined =
    vehicleTypes?.data?.map((type) => ({
      value: type,
      label: type,
    })) as { value: string; label: string }[];

  const vehicleBrandOptions: { value: string; label: string }[] | undefined =
    vehicleBrands?.data?.map((brand) => ({
      value: brand,
      label: brand,
    })) as { value: string; label: string }[];

  const transMissionOptions: { value: string; label: string }[] | undefined =
    transMission?.map((transmission) => ({
      value: transmission,
      label: transmission,
    })) as { value: string; label: string }[];

  const luggageCapacityOptions: { value: string; label: string }[] | undefined =
    luggageCapacity?.map((transmission) => ({
      value: transmission,
      label: transmission,
    })) as { value: string; label: string }[];

  const rateCardOptions: { value: string; label: string }[] | undefined =
    rateCards?.data?.map((rateCard) => ({
      value: rateCard.id,
      label: rateCard.name,
    })) as { value: string; label: string }[];

  const handleError = (errors: Record<string, unknown>) => {
    console.log("Validation Errors:", errors);
    console.log("Current Form Data:", getValues());
  };

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
                {initialData ? "Edit Vehicle Model" : "Add Vehicle Model"}
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit, handleError)}
              className="mt-5 space-y-8"
            >
              <Controller
                name="modelName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Model Name"
                    mandotary
                    placeholder="Ex: Vagan R"
                    error={errors["modelName"]?.message}
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
                          placeholder="Select a vehicle type"
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
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Vehicle Brand
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={vehicleBrandOptions} // from backend or hardcoded enum
                          placeholder="Select a vehicle brand"
                          value={
                            vehicleBrandOptions.find(
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
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Transmission
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="options.transmission"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={transMissionOptions} // from backend or hardcoded enum
                          placeholder="Select transmission"
                          value={
                            transMissionOptions.find(
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
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Luggage Capacity
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="options.luggageCapacity"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={luggageCapacityOptions} // from backend or hardcoded enum
                          placeholder="Select a luggage capacity option"
                          value={
                            luggageCapacityOptions.find(
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
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Rate Card
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="rateCardId"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={rateCardOptions} // from backend or hardcoded enum
                          placeholder="Select a rate card"
                          value={
                            rateCardOptions.find(
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
                name="options.passengerCount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Passenger Count"
                    mandotary
                    placeholder="Ex: 4"
                    error={errors["modelName"]?.message}
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
                      const value = e.target.value;
                      // Convert to number, or use 0 if empty
                      field.onChange(value === "" ? 0 : Number(value));
                    }}
                  />
                )}
              />
              <div className="flex flex-col gap-4 mt-[-90px]">
                <label className="text-sm font-semibold">Air Condition</label>
                <ToggleButton
                  isButtonActive={isAirConditioned}
                  onToggle={setIsAirConditioned}
                />
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    setIsAirConditioned(true);
                    setIsAddVehicleModelOpen(false);
                  }}
                />
                <Button
                  children={
                    initialData ? "Update Vehicle Model" : "Add Vehicle Model"
                  }
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

export default AddVehicleModel;
