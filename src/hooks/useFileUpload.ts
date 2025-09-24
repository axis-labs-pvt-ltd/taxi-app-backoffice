// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { ThunkDispatch } from "redux-thunk";
// import { ImageActionTypes } from "../redux/Images/ImageReducer";
// import { ResetStoredImage, uploadImage } from "../redux/Images/ImageAction";

// type AppDispatch = ThunkDispatch<RootState, unknown, ImageActionTypes>;

// const useFileUpload = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { imageUrl } = useSelector((state: RootState) => state.images);

//   const [dragActive, setDragActive] = useState<boolean>(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [imageName, setImageName] = useState<string>("");

//   const handleUpload = (file: File) => {
//   if (!file) return;

//   // Generate unique filename (optional, backend already generates a UUID)
//   const uniqueFileName = `${Date.now()}_${file.name}`;
//   setImageName(uniqueFileName);

//   // For preview
//   const imageUrl = URL.createObjectURL(file);
//   setSelectedImage(imageUrl);

//   // Create FormData with field name "file" (must match multer config)
//   const formData = new FormData();
//   formData.append("file", file, uniqueFileName); // ✅ use "file" not "files"

//   dispatch(uploadImage(formData));
// };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       handleUpload(file);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragActive(true);
//   };

//   const handleDragLeave = () => {
//     setDragActive(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragActive(false);
//     const file = event.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       handleUpload(file);
//     } else {
//       alert("Only image files are allowed.");
//     }
//   };

//   const handleClearImage = () => {
//     setSelectedImage(null);
//     setImageName("");
//     dispatch(ResetStoredImage());
//   };

//   return {
//     selectedImage,
//     handleClearImage,
//     dragActive,
//     handleDragOver,
//     handleDragLeave,
//     handleDrop,
//     handleFileChange,
//     imageName,
//   };
// };

// export default useFileUpload;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { ImageActionTypes } from "../redux/Images/ImageReducer";
import { ResetStoredImage, uploadImage } from "../redux/Images/ImageAction";
import { ImageUrlType } from "../types/Common.types";

type AppDispatch = ThunkDispatch<RootState, unknown, ImageActionTypes>;

export interface SelectedFile {
  file: File;
  previewUrl: string;
  name: string;
}

const useFileUpload = () => {
  const dispatch: AppDispatch = useDispatch();
  const { imageUrl } = useSelector((state: RootState) => state.images);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [imageUrls, setImageUrls] = useState<
    { url: string; fileName: string }[]
  >([]);
  const previousImageUrlRef = useRef<ImageUrlType | null>(null);

  useEffect(() => {
    if (imageUrl?.files?.length) {
      // Check if this is actually new data (not a reset/replacement)
      const isNewUpload = previousImageUrlRef.current !== imageUrl;

      if (isNewUpload) {
        setImageUrls((prev) => {
          const existingUrls = new Set(prev.map((f) => f.url));
          const filesToAdd = imageUrl.files.filter(
            (file) => !existingUrls.has(file.url)
          );

          if (filesToAdd.length === 0) return prev;

          const newFiles = filesToAdd.map((file) => ({
            url: file.url,
            fileName: file.fileName,
          }));

          return [...prev, ...newFiles];
        });
      }

      // Update the ref to track the current state
      previousImageUrlRef.current = imageUrl;
    }
  }, [imageUrl]);

  console.log(imageUrls);

  const handleUpload = (files: FileList) => {
    if (!files || files.length === 0) return;

    const filesArray: SelectedFile[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));

    setSelectedFiles((prev) => [...prev, ...filesArray]);

    // Prepare FormData for all files
    const formData = new FormData();
    filesArray.forEach((fileObj) =>
      formData.append("files", fileObj.file, fileObj.name)
    );

    dispatch(uploadImage(formData));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleUpload(event.target.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    handleUpload(event.dataTransfer.files);
  };

  const handleClearImages = () => {
    selectedFiles.forEach((file) => URL.revokeObjectURL(file.previewUrl)); // clean up
    setSelectedFiles([]);
    dispatch(ResetStoredImage());
  };

  return {
    selectedFiles,
    handleClearImages,
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    imageUrls,
    setImageUrls,
    setSelectedFiles,
  };
};

export default useFileUpload;
