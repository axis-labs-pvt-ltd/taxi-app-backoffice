import React, { useState } from "react";
import { Button } from "../Reusable/Button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import { ToursDataType } from "../../types/Tours.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema } from "../../schemas/Tours.schema";
import ImageUpload from "../Reusable/ImageUpload";
import { SelectedFile } from "../../hooks/useFileUpload";

interface AddTourProps {
  setIsAddTourOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: ToursDataType | undefined;
  onSubmit: (data: ToursDataType, id?: string) => void;
  selectedFiles: SelectedFile[];
  handleClearImages: () => void;
  dragActive: boolean;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: {
    url: string;
    fileName: string;
  }[];
}

const AddTour: React.FC<AddTourProps> = ({
  setIsAddTourOpen,
  initialData,
  onSubmit,
  selectedFiles,
  handleClearImages,
  dragActive,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
  imageUrls,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ToursDataType>({
    resolver: zodResolver(tourSchema),
    defaultValues: initialData,
  });
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (data: ToursDataType) => {
    if (selectedFiles.length < 1) {
      setError(" Please upload at least one image.");
      return;
    }
    let payload;
    if (initialData) {
      payload = {
        ...data,
        images: selectedFiles.map((file) => file.previewUrl),
      };
    } else {
      payload = {
        ...data,
        images: imageUrls.map((img) => img.url),
      };
    }

    if (initialData?.id) {
      onSubmit(payload, initialData.id); // Pass ID for update
    } else {
      onSubmit(payload);
    }
    setIsAddTourOpen(false);
    reset();
  };

  const handleError = (errors: Record<string, unknown>) => {
    console.log("Validation Errors:", errors);
    console.log("Current Form Data:", getValues());
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div
          className="w-[850px] max-h-[90vh] bg-white shadow-lg overflow-y-auto rounded-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-10 py-8">
            <div>
              <p className="text-2xl font-bold tracking-wider">
                {initialData ? "Edit Tour" : "Add Tour"}
              </p>
            </div>
            <div className="border-b border-[#EBEBEB] w-full mt-4"></div>

            <form
              onSubmit={handleSubmit(handleFormSubmit, handleError)}
              className="mt-5 space-y-6"
            >
              {/* Title */}
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Tour Title"
                    mandotary
                    placeholder="Enter tour title"
                    error={errors["title"]?.message}
                    width="w-full"
                  />
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Short Description"
                    mandotary
                    placeholder="Enter short description"
                    error={errors["description"]?.message}
                    width="w-full"
                  />
                )}
              />

              {/* Long Description */}
              <div>
                <label className="text-sm font-semibold">
                  Long Description
                </label>
                <Controller
                  name="longDescription"
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

              {/* Location */}
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Location"
                    mandotary
                    placeholder="Enter location"
                    error={errors["location"]?.message}
                    width="w-full"
                  />
                )}
              />

              {/* Price & Rating */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="price"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Price"
                      mandotary
                      placeholder="Enter price"
                      type="number"
                      error={errors["price"]?.message}
                      width="w-full"
                    />
                  )}
                />
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={5}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Rating"
                      placeholder="0 - 5"
                      type="number"
                      step="0.1"
                      error={errors["rating"]?.message}
                      width="w-full"
                    />
                  )}
                />
              </div>

              {/* Days & Nights */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="days"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Days"
                      mandotary
                      placeholder="Enter number of days"
                      type="number"
                      error={errors["days"]?.message}
                      width="w-full"
                    />
                  )}
                />
                <Controller
                  name="nights"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nights"
                      mandotary
                      placeholder="Enter number of nights"
                      type="number"
                      error={errors["nights"]?.message}
                      width="w-full"
                    />
                  )}
                />
              </div>

              {/* Images */}
              {/* <div>
                <label className="text-sm font-semibold">
                  Tour Images (3 - 4 URLs)
                  <span className="text-sm text-[#F34747]">*</span>
                </label>
                <Controller
                  name="images"
                  control={control}
                  defaultValue={[""]}
                  render={({ field }) => (
                    <div className="space-y-2 mt-2">
                      {field.value.map((url: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={url}
                            placeholder={`Image URL ${idx + 1}`}
                            onChange={(e) => {
                              const newUrls = [...field.value];
                              newUrls[idx] = e.target.value;
                              field.onChange(newUrls);
                            }}
                            className="flex-1 border border-gray-300 rounded-md p-2"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((_, i) => i !== idx)
                              )
                            }
                            className="px-2 text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {field.value.length < 4 && (
                        <button
                          type="button"
                          onClick={() => field.onChange([...field.value, ""])}
                          className="text-sm text-blue-600"
                        >
                          + Add Image
                        </button>
                      )}
                      {errors["images"] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["images"].message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div> */}

              <ImageUpload
                selectedFiles={selectedFiles}
                dragActive={dragActive}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                handleClearImages={handleClearImages}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

              {/* Buttons */}
              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  onClick={() => setIsAddTourOpen(false)}
                />
                <Button
                  children={initialData ? "Update Tour" : "Add Tour"}
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

export default AddTour;
