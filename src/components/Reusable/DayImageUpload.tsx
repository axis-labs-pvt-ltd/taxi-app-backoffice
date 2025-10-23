// components/Tours/DayImageUpload.tsx
import React, { useState } from "react";
import { Button } from "../Reusable/Button";
import { useDispatch } from "react-redux";
import { uploadDayImage } from "../../redux/Images/ImageAction";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { ImageActionTypes } from "../../redux/Images/ImageReducer";

type AppDispatch = ThunkDispatch<RootState, unknown, ImageActionTypes>;

interface DayImageUploadProps {
  dayIndex: number;
  onImageUploaded: (url: string) => void;
  existingImage?: string;
}

const DayImageUpload: React.FC<DayImageUploadProps> = ({
  dayIndex,
  onImageUploaded,
  existingImage,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [preview, setPreview] = useState<string | null>(existingImage || null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Prepare FormData
    const formData = new FormData();
    formData.append("files", file);

    setUploading(true);
    try {
      const result: any = await dispatch(uploadDayImage(formData));
      console.log(result);
      // ✅ Expect backend returns [{ url, fileName }]
      const uploadedUrl = result?.payload?.files?.[0]?.url;
      if (uploadedUrl) {
        onImageUploaded(uploadedUrl);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded("");
  };

  return (
    <div className="border border-dashed rounded-md p-3 mt-2">
      <p className="text-sm mb-2 font-medium">Day {dayIndex + 1} Image</p>

      {preview ? (
        <div className="flex items-center gap-3">
          <img
            src={preview}
            alt={`Day ${dayIndex + 1}`}
            className="w-32 h-24 object-cover rounded-md"
          />
          <Button type="button" size="small" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block text-sm"
          />
          {uploading && (
            <p className="text-xs text-gray-500 mt-1">Uploading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default DayImageUpload;
