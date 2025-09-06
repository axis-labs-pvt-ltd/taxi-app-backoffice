import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import { Button } from "../Reusable/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExtraServiceType,
  ExtraServicePaginatedDataType,
} from "../../types/ExtraServices.types";
import { ToggleButton } from "../Reusable/ToggleButton";
import { extraServiceSchema } from "../../schemas/ExtraServices.schema";

interface AddExtraServiceProps {
  setIsAddVehicleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: ExtraServicePaginatedDataType | undefined;
  onSubmit: (data: CreateExtraServiceType, id?: string) => void;
  isFree: boolean;
  setIsFree: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExtraService: React.FC<AddExtraServiceProps> = ({
  setIsAddVehicleOpen,
  initialData,
  onSubmit,
  isFree,
  setIsFree,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateExtraServiceType>({
    resolver: zodResolver(extraServiceSchema),
    defaultValues: initialData
      ? {
          name: initialData.name ?? "",
          price: initialData.price ?? 0,
          isFree: initialData.isFree ?? false,
        }
      : {
          name: "",
          price: 0,
          isFree: false,
        },
  });

  useEffect(() => {
    if (initialData) {
      setIsFree(initialData?.isFree);
    }
  }, []);

  const handleFormSubmit = (data: CreateExtraServiceType) => {
    const payload = {
      ...data,
      isFree: isFree,
    };
    if (initialData?.id) {
      onSubmit(payload, initialData.id); // Pass ID for update
    } else {
      onSubmit(payload);
    }
    setIsAddVehicleOpen(false);
    reset();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => {
          setIsFree(false);
          setIsAddVehicleOpen(false);
        }}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => {
          setIsFree(false);
          setIsAddVehicleOpen(false);
        }}
      >
        <div
          className="w-[850px] h-[510px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                {initialData ? "Edit Service" : "Add Service"}
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-5 space-y-8"
            >
              {/* Use Controller for the "name" field */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Service Name"
                    mandotary
                    placeholder="Service name"
                    error={errors["name"]?.message}
                    width="w-full"
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    inputPrefix="Rs. "
                    label="Service Price"
                    placeholder="Service price"
                    error={errors["price"]?.message}
                    width="w-full"
                    mandotary
                    onChange={(e) => {
                      const value = e.target.value;
                      // Convert to number, or use 0 if empty
                      field.onChange(value === "" ? 0 : Number(value));
                    }}
                  />
                )}
              />
              <div className="flex flex-col gap-4 mt-[-90px]">
                <label className="text-sm font-semibold">Is Available</label>
                <ToggleButton isButtonActive={isFree} onToggle={setIsFree} />
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children={initialData ? "Update Service" : "Add Service"}
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

export default AddExtraService;
