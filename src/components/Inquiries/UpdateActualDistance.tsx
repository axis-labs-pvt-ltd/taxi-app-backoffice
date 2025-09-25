import React from "react";
import { Button } from "../Reusable/Button";
import { Controller, useForm } from "react-hook-form";
import { updateActualDistanceType } from "../../types/Vehicle.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Reusable/Input";
import { updateTotalDistanceSchema } from "../../schemas/Vehicle.schema";

interface UpdateActualDistanceProps {
  setIsUpdateDistanceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateActualDistance: (data: updateActualDistanceType) => void;
}

const UpdateActualDistance: React.FC<UpdateActualDistanceProps> = ({
  setIsUpdateDistanceModalOpen,
  handleUpdateActualDistance,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateActualDistanceType>({
    resolver: zodResolver(updateTotalDistanceSchema),
  });

  const handleFormSubmit = (data: updateActualDistanceType) => {
    handleUpdateActualDistance(data);
    setIsUpdateDistanceModalOpen(false);
    reset();
  };

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
                Update Actual Distance
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-5 space-y-8"
            >
              <div className="flex flex-col gap-2">
                <Controller
                  name="actualTotalDistance"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        label="Actual Distance"
                        mandotary
                        placeholder="Actual distance"
                        error={errors["actualTotalDistance"]?.message}
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
                    </div>
                  )}
                />
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  type="button"
                  onClick={() => setIsUpdateDistanceModalOpen(false)}
                />
                <Button
                  children="Update Actual Distance"
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

export default UpdateActualDistance;
