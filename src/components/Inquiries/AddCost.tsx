import React from "react";
import { Button } from "../Reusable/Button";
import { ReduxState } from "../../types/Redux.types";
import {
  AddCostsType,
  CostCategoriesType,
} from "../../types/CostCategory.types";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Reusable/Input";
import { addCostsSchema } from "../../schemas/CostCategory.schema";

interface AddCostsProps {
  setIsAddCostsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  costCategories: ReduxState<CostCategoriesType[] | null>;
  handleAddCosts: (data: AddCostsType) => Promise<void>;
}

const AddCosts: React.FC<AddCostsProps> = ({
  setIsAddCostsOpen,
  costCategories,
  handleAddCosts,
}) => {
  const { control, handleSubmit, reset, watch } = useForm<AddCostsType>({
    resolver: zodResolver(addCostsSchema),
    // defaultValues: initialData.data || { startMeter: 0, endMeter: 0 },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "costs",
  });

  const handleFormSubmit = (data: AddCostsType) => {
    handleAddCosts(data);
    setIsAddCostsOpen(false);
    reset();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div
          className="w-[850px] h-[450px] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">Add Costs</p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-5 space-y-8"
            >
              <div>
                <div className="mt-8">
                  <p className="text-lg font-semibold">Cost Categories</p>
                  <div className="border-b border-[#EBEBEB] w-full mt-2 mb-4"></div>

                  {fields.map((item, index) => {
                    // Disable already selected categories for other selects
                    const selectedCategoryIds = watch("costs")?.map(
                      (c: any) => c.categoryId
                    );
                    const availableCategories = costCategories?.data?.filter(
                      (cat: CostCategoriesType) =>
                        !selectedCategoryIds?.includes(cat.id) ||
                        cat.id === item.costCategoryId
                    );

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 mb-3 bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex-1">
                          <Controller
                            name={`costs.${index}.costCategoryId`}
                            control={control}
                            render={({ field }) => (
                              <select
                                {...field}
                                className="w-full border border-gray-300 rounded-md p-2"
                              >
                                <option value="">Select category</option>
                                {availableCategories?.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                        </div>

                        <div className="flex-1">
                          <Controller
                            name={`costs.${index}.amount`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Amount"
                                width="w-full"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? undefined
                                      : Number(e.target.value)
                                  )
                                }
                              />
                            )}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 font-bold text-lg"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}

                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => append({ costCategoryId: "", amount: 0 })}
                  >
                    + Add Category
                  </Button>
                </div>
              </div>

              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  type="button"
                  onClick={() => setIsAddCostsOpen(false)}
                />
                <Button
                  children="Add Costs"
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

export default AddCosts;
