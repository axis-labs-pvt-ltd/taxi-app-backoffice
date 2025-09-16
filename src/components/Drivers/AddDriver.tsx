"use client";
import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<"basic" | "address" | "emergency">(
    "basic"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDriveType>({
    resolver: zodResolver(createDriveSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          status:
            ["available", "booked", "not available"].includes(
              initialData.status
            )
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
          address: { street: "", city: "", state: "", zipCode: "" },
          emergencyContact: { name: "", phone: "", relationship: "" },
          status: "available",
        },
  });

  const handleFormSubmit = (data: CreateDriveType) => {
    if (initialData?.id) {
      onSubmit(data, initialData.id);
    } else {
      onSubmit(data);
    }
    setIsAddDriverOpen(false);
    reset();
  };

  const driverTypeOptions =
    driverTypes?.data?.map((type) => ({ value: type, label: type })) || [];

  const driverStatusOptions =
    driverStatus?.data?.map((type) => ({ value: type, label: type })) || [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => setIsAddDriverOpen(false)}
      />
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => setIsAddDriverOpen(false)}
      >
        <div
          className="w-[1050px] h-[650px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <p className="text-2xl font-bold tracking-wider">
              {initialData ? "Edit Driver" : "Add Driver"}
            </p>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>

            {/* Tabs */}
            <div className="flex gap-6 mt-4 border-b">
              {["basic", "address", "emergency"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`pb-2 px-2 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() =>
                    setActiveTab(tab as "basic" | "address" | "emergency")
                  }
                >
                  {tab === "basic"
                    ? "Basic"
                    : tab === "address"
                    ? "Address"
                    : "Emergency Contact"}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-6 space-y-6"
            >
              {/* BASIC TAB */}
              {activeTab === "basic" && (
                <>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Full Name"
                        mandotary
                        placeholder="Full name"
                        error={errors.fullName?.message}
                        width="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="text-sm font-semibold">
                          Driver Type<span className="text-red-500">*</span>
                        </label>
                        <Select
                          options={driverTypeOptions}
                          placeholder="Select type"
                          value={
                            driverTypeOptions.find(
                              (opt) => opt.value === field.value
                            ) || null
                          }
                          onChange={(opt) => field.onChange(opt?.value)}
                          isClearable
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="status"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="text-sm font-semibold">
                          Driver Status<span className="text-red-500">*</span>
                        </label>
                        <Select
                          options={driverStatusOptions}
                          placeholder="Select status"
                          value={
                            driverStatusOptions.find(
                              (opt) => opt.value === field.value
                            ) || null
                          }
                          onChange={(opt) => field.onChange(opt?.value)}
                          isClearable
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="mobileNo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Mobile No"
                        placeholder="Mobile no"
                        error={errors.mobileNo?.message}
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
                        error={errors.email?.message}
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
                        error={errors.dateOfBirth?.message}
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
                        label="Join Date"
                        error={errors.joinDate?.message}
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
                        error={errors.drivingLicenseExpireDate?.message}
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
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? 0 : Number(e.target.value)
                          )
                        }
                      />
                    )}
                  />
                </>
              )}

              {/* ADDRESS TAB */}
              {activeTab === "address" && (
                <>
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
                </>
              )}

              {/* EMERGENCY TAB */}
              {activeTab === "emergency" && (
                <>
                  <Controller
                    name="emergencyContact.name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        label="Emergency Contact Name"
                        error={errors.emergencyContact?.name?.message}
                        width="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="emergencyContact.phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        label="Emergency Contact Phone"
                        error={errors.emergencyContact?.phone?.message}
                        width="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="emergencyContact.relationship"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        label="Relationship"
                        error={errors.emergencyContact?.relationship?.message}
                        width="w-full"
                      />
                    )}
                  />
                </>
              )}

              {/* Submit Button */}
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
