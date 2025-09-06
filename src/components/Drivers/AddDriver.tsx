import React from "react";
import { Button } from "../Reusable/Button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import Select from "react-select";
import {
  CreateDriveType,
  DriversPaginatedDataType,
} from "../../types/Drivers.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReduxState } from "../../types/Redux.types";
import { createDriveSchema } from "../../schemas/Drivers.schema";

interface AddDriverProps {
  setIsAddDriverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: DriversPaginatedDataType | undefined;
  driverStatus: ReduxState<string[] | null>;
  driverTypes: ReduxState<string[] | null>;
  onSubmit: (data: CreateDriveType, id?: string) => void;
}

const AddDriver: React.FC<AddDriverProps> = ({
  setIsAddDriverOpen,
  initialData,
  driverStatus,
  driverTypes,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<CreateDriveType>({
    resolver: zodResolver(createDriveSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          status:
            initialData.status === "available" ||
            initialData.status === "booked" ||
            initialData.status === "not available"
              ? initialData.status
              : "available",
        }
      : {
          fullName: "",
          type: "",
          mobileNo: "",
          drivingLicenseExpireDate: "",
          email: "",
          dateOfBirth: "",
          joinDate: "",
          salary: 0,
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
          emergencyContact: {
            name: "",
            phone: "",
            relationship: "",
          },
          status: "available",
        },
  });

  const handleFormSubmit = (data: CreateDriveType) => {
    if (initialData?.id) {
      onSubmit(data, initialData.id); // Pass ID for update
    } else {
      onSubmit(data);
    }
    setIsAddDriverOpen(false);
    reset();
  };

  const driverTypeOptions: { value: string; label: string }[] | undefined =
    driverTypes?.data?.map((type) => ({
      value: type,
      label: type,
    })) as { value: string; label: string }[];

  const driverStatusOptions: { value: string; label: string }[] | undefined =
    driverStatus?.data?.map((type) => ({
      value: type,
      label: type,
    })) as { value: string; label: string }[];

  const handleError = (errors: Record<string, unknown>) => {
    console.log("Validation Errors:", errors);
    console.log("Current Form Data:", getValues());
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => setIsAddDriverOpen(false)}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => setIsAddDriverOpen(false)}
      >
        <div
          className="w-[1050px] h-[630px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                {initialData ? "Edit Driver" : "Add Driver"}
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit, handleError)}
              className="mt-5 space-y-8"
            >
              {/* Use Controller for the "name" field */}
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Full Name"
                    mandotary
                    placeholder="Full name"
                    error={errors["fullName"]?.message}
                    width="w-full"
                  />
                )}
              />
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Driver Type
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={driverTypeOptions} // from backend or hardcoded enum
                          placeholder="Select vehicle type"
                          value={
                            driverTypeOptions.find(
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
                    Driver Status
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={driverStatusOptions} // from backend or hardcoded enum
                          placeholder="Select vehicle type"
                          value={
                            driverStatusOptions.find(
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
                name="mobileNo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Mobile No"
                    placeholder="Mobile no"
                    error={errors["mobileNo"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    placeholder="Email"
                    error={errors["email"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Date of Birth"
                    error={errors["dateOfBirth"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="joinDate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Joind Date"
                    error={errors["joinDate"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="drivingLicenseExpireDate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Driving License Expire Date"
                    error={errors["joinDate"]?.message}
                    width="w-full"
                  />
                )}
              />

              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Salary"
                    placeholder="Salary"
                    error={errors.salary?.message}
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

              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Street"
                    error={errors.address?.street?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="City"
                    error={errors.address?.city?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="State"
                    error={errors.address?.state?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="address.zipCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Zip Code"
                    error={errors.address?.zipCode?.message}
                    width="w-full"
                  />
                )}
              />

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children={initialData ? "Update Driver" : "Add Driver"}
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

export default AddDriver;
