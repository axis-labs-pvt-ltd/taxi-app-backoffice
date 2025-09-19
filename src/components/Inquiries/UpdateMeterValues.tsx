import React, { useEffect } from "react";
import { Button } from "../Reusable/Button";
import { Controller, useForm } from "react-hook-form";
import { UpdateMeterValuesType } from "../../types/Vehicle.types";
import { Input } from "../Reusable/Input";
import { updateMeterValuesSchema } from "../../schemas/Vehicle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReduxState } from "../../types/Redux.types";
import { MeterValuesType } from "../../types/Inquiries.types";

interface UpdateMeterValuesProps {
  setIsUpdateMeterValuesModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  handleUpdateMeterValues: (data: UpdateMeterValuesType) => void;
  initialData: ReduxState<MeterValuesType | null>;
}

const UpdateMeterValues: React.FC<UpdateMeterValuesProps> = ({
  setIsUpdateMeterValuesModalOpen,
  handleUpdateMeterValues,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateMeterValuesType>({
    resolver: zodResolver(updateMeterValuesSchema),
    defaultValues: initialData.data || { startMeter: 0, endMeter: 0 },
  });

  const [totalDistance, setTotalDistnace] = React.useState<number>(0);

  const handleFormSubmit = (data: UpdateMeterValuesType) => {
    handleUpdateMeterValues(data);
    setIsUpdateMeterValuesModalOpen(false);
    reset();
  };

  useEffect(() => {
    const start = watch("startMeter");
    const end = watch("endMeter");
    if (end ?? 0 > start) {
      setTotalDistnace((end ?? 0) - start);
    }
  }, [watch("startMeter"), watch("endMeter")]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => setIsUpdateMeterValuesModalOpen(false)}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => setIsUpdateMeterValuesModalOpen(false)}
      >
        <div
          className="w-[850px] h-[450px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
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
              <div className="flex flex-col gap-4">
                <Controller
                  name="startMeter"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        label="Start Meter"
                        mandotary
                        placeholder="Start Meter"
                        error={errors["startMeter"]?.message}
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
                <Controller
                  name="endMeter"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        label="End Meter"
                        placeholder="End meter"
                        error={errors["endMeter"]?.message}
                        width="w-full"
                        value={field.value ?? ""} // 👈 convert null/undefined to ""
                        onKeyDown={(e) => {
                          if (
                            [8, 9, 13, 27, 46].includes(e.keyCode) ||
                            (e.keyCode === 65 && e.ctrlKey) ||
                            (e.keyCode === 67 && e.ctrlKey) ||
                            (e.keyCode === 86 && e.ctrlKey) ||
                            (e.keyCode === 88 && e.ctrlKey) ||
                            (e.keyCode >= 48 && e.keyCode <= 57) ||
                            (e.keyCode >= 96 && e.keyCode <= 105)
                          ) {
                            return;
                          }
                          e.preventDefault();
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? undefined : Number(value)
                          ); // 👈 store undefined instead of null
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex items-center justify-between -mt-2">
                <p className="text-sm font-semibold">Total distance:</p>
                <p className="text-sm font-semibold">
                  {totalDistance > 0 && totalDistance.toFixed(2) + " Km"}
                </p>
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
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

export default UpdateMeterValues;
