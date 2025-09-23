import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import { Button } from "../Reusable/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RateCardsType } from "../../types/RateCards.types";
import { rateCardSchema } from "../../schemas/RateCards.schema";
import Select from "react-select";

const currencies = ["LKR"];

interface AddRateCardProps {
  setIsAddRateCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: RateCardsType | undefined;
  onSubmit: (data: RateCardsType, id?: string) => void;
}

const AddRateCard: React.FC<AddRateCardProps> = ({
  setIsAddRateCardOpen,
  initialData,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<RateCardsType>({
    resolver: zodResolver(rateCardSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: RateCardsType) => {
    const payload = {
      ...data,
    };
    if (initialData?.id) {
      onSubmit(payload, initialData.id); // Pass ID for update
    } else {
      onSubmit(data);
    }
    setIsAddRateCardOpen(false);
    reset();
  };

  const currencyOptions: { value: string; label: string }[] | undefined =
    currencies?.map((currency) => ({
      value: currency,
      label: currency,
    })) as { value: string; label: string }[];

  const handleError = (errors: Record<string, unknown>) => {
    console.log("Validation Errors:", errors);
    console.log("Current Form Data:", getValues());
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => {
          setIsAddRateCardOpen(false);
        }}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-40 p-4"
        onClick={() => {
          setIsAddRateCardOpen(false);
        }}
      >
        <div
          className="w-[850px] h-[630px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                {initialData ? "Edit Rate Card" : "Add Rate Card"}
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit, handleError)}
              className="mt-5 space-y-8"
            >
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Rate Card Name"
                    mandotary
                    placeholder="Ex: Vagan R"
                    error={errors["name"]?.message}
                    width="w-full"
                  />
                )}
              />
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">
                    Currency
                    <span className="text-sm text-[#F34747]">*</span>
                  </label>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Select
                          options={currencyOptions} // from backend or hardcoded enum
                          placeholder="Select the currency"
                          value={
                            currencyOptions.find(
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
                name="includedKmPerDay"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Kms per Day"
                    mandotary
                    placeholder="Kms per day"
                    error={errors["includedKmPerDay"]?.message}
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
                name="dailyRate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Daily Rate"
                    mandotary
                    placeholder="Daily rate"
                    error={errors["dailyRate"]?.message}
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
                name="extraKmRate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Rate per extra km"
                    mandotary
                    placeholder="Rate Per Extra Km"
                    error={errors["extraKmRate"]?.message}
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

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  onClick={() => setIsAddRateCardOpen(false)}
                />
                <Button
                  children={
                    initialData ? "Update Rate Card" : "Add Rate Card"
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

export default AddRateCard;
