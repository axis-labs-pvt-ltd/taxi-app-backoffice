// import React from "react";
// import { IoIosCloseCircle } from "react-icons/io";
// import FileIcon from "../../assets/File_Icon.png";

// interface ImageUplaodProps {
//   selectedImage: string | null;
//   handleClearImage: () => void;
//   dragActive: boolean;
//   handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
//   handleDragLeave: () => void;
//   handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
//   handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   imageName: string;
// }

// const ImageUpload: React.FC<ImageUplaodProps> = ({
//   selectedImage,
//   handleClearImage,
//   dragActive,
//   handleDragOver,
//   handleDragLeave,
//   handleDrop,
//   handleFileChange,
//   imageName,
// }) => {
//   return (
//     <div className="flex flex-col w-full gap-3 ">
//       <div className="flex items-center justify-between gap-4">
//         <p className="text-sm font-semibold">Upload image</p>
//         {selectedImage && (
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={handleClearImage}
//           >
//             <p className="text-red-500 text-xs font-normal">Clear Image</p>
//             <IoIosCloseCircle color="red" size={16} />
//           </div>
//         )}
//       </div>
//       <div
//         className={`w-full border border-[#ADAEB7] border-dashed rounded-md px-5 py-6 text-center cursor-pointer ${
//           dragActive ? "bg-gray-100" : ""
//         }`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="hidden"
//           id="fileInput"
//         />
//         <label htmlFor="fileInput" className="block cursor-pointer">
//           <div className="flex justify-center">
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt={imageName}
//                 className="object-cover w-16 h-16 rounded-md"
//               />
//             ) : (
//               <img src={FileIcon} alt="File Icon" className="w-8 h-8" />
//             )}
//           </div>
//           <p className="text-xs text-[#ADADAD] font-medium mt-3">
//             {imageName || "Drag and drop or click here."}
//           </p>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;

import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import FileIcon from "../../assets/File_Icon.png";

interface ImageUploadProps {
  selectedFiles: { previewUrl: string; name: string }[];
  handleClearImages: () => void;
  dragActive: boolean;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFiles,
  handleClearImages,
  dragActive,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold">Upload images</p>
        {selectedFiles.length > 0 && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleClearImages}
          >
            <p className="text-red-500 text-xs font-normal">Clear Images</p>
            <IoIosCloseCircle color="red" size={16} />
          </div>
        )}
      </div>

      <div
        className={`w-full border border-[#ADAEB7] border-dashed rounded-md px-5 py-6 text-center cursor-pointer ${
          dragActive ? "bg-gray-100" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="block cursor-pointer">
          <div className="flex flex-wrap justify-center gap-3">
            {selectedFiles.length > 0
              ? selectedFiles.map((file) => (
                  <img
                    key={file.name}
                    src={file.previewUrl}
                    alt={file.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                ))
              : <img src={FileIcon} alt="File Icon" className="w-8 h-8" />}
          </div>
          <p className="text-xs text-[#ADADAD] font-medium mt-3">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} file(s) selected`
              : "Drag and drop or click here."}
          </p>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;

