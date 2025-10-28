import React, { useEffect, useState } from "react";
import { Button } from "../Reusable/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Input } from "../Reusable/Input";
import { ToursDataType } from "../../types/Tours.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema } from "../../schemas/Tours.schema";
import ImageUpload from "../Reusable/ImageUpload";
import { SelectedFile } from "../../hooks/useFileUpload";
import DropPointsSection from "./DropPointSection";
import { IoIosRemoveCircle } from "react-icons/io";
import DayImageUpload from "../Reusable/DayImageUpload";

interface AddTourProps {
  handleCancel: () => void;
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
  currentImages: string[];
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
  uploading: boolean;
}

const AddTour: React.FC<AddTourProps> = ({
  handleCancel,
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
  currentImages,
  setCurrentImages,
  uploading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ToursDataType>({
    resolver: zodResolver(tourSchema),
    defaultValues: initialData || {
      itinerary: [],
    },
  });
  const [error, setError] = useState<string | null>(null);

  const {
    fields: itineraryFields,
    append: addDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: "itinerary",
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData); // <- ensures itinerary & dropPoints arrays are populated
      setCurrentImages(initialData.images ?? []);
    }
  }, [initialData, reset, setCurrentImages]);

  console.log("Current Form Data:", getValues());

  const handleFormSubmit = (data: ToursDataType) => {
    if (selectedFiles.length < 1) {
      setError(" Please upload at least one image.");
      return;
    }
    let payload;
    if (initialData) {
      payload = {
        ...data,
        images:
          currentImages.length > 0
            ? [
                ...(initialData.images ?? []),
                ...imageUrls.map((img) => img.url),
              ]
            : imageUrls.map((img) => img.url),
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
    handleCancel();
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
          className="w-[1050px] max-h-[90vh] bg-white shadow-lg overflow-y-auto rounded-md p-4"
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
                      label="Price per Person"
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

              <ImageUpload
                selectedFiles={selectedFiles}
                dragActive={dragActive}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                handleClearImages={handleClearImages}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}

              {/* ========== DAY-WISE ITINERARY ========== */}
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Day-wise Itinerary</h3>
                  <Button
                    type="button"
                    size="small"
                    variant="primary"
                    onClick={() =>
                      addDay({
                        dayNumber: (itineraryFields.length + 1).toString(),
                        title: "",
                        description: "",
                        image: "",
                        dropPoints: [],
                      })
                    }
                  >
                    + Add Day
                  </Button>
                </div>

                {itineraryFields.map((day, dayIndex) => (
                  <div
                    key={day.id}
                    className="border border-[#e7e7e7] rounded-xl p-4 mt-4 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">Day {dayIndex + 1}</h4>
                      <IoIosRemoveCircle
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeDay(dayIndex)}
                      />
                    </div>

                    <Controller
                      control={control}
                      name={`itinerary.${dayIndex}.title`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Day Title"
                          width="w-full"
                          placeholder="Ex: Arrival & City Tour"
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`itinerary.${dayIndex}.description`}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={3}
                          placeholder="Describe the day's activities"
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`itinerary.${dayIndex}.image`}
                      render={({ field }) => (
                        <DayImageUpload
                          dayIndex={dayIndex}
                          existingImage={field.value}
                          onImageUploaded={(url) => field.onChange(url)}
                        />
                      )}
                    />

                    {/* ---- Drop Points for this Day ---- */}
                    <DropPointsSection control={control} dayIndex={dayIndex} />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="w-full flex items-center justify-end gap-8 mt-8">
                <Button
                  children="Cancel"
                  variant="secondary"
                  size="small"
                  type="button"
                  onClick={() => handleCancel()}
                />
                <Button
                  children={initialData ? "Update Tour" : "Add Tour"}
                  variant="primary"
                  size="small"
                  type="submit"
                  disabled={uploading}
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
