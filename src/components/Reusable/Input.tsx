// import React, { forwardRef } from "react";

// type InputProps = {
//   type?: React.HTMLInputTypeAttribute | "textarea";
//   id?: string;
//   name?: string;
//   mandotary?: boolean;
//   placeholder?: string;
//   className?: string;
//   rows?: number;
//   width?: string;
//   error?: string;
//   label?: string;
//   min?: string;
//   icon?: React.ReactNode;
//   bgColor?: string;
//   borderColor?: string;
//   inputPrefix?: string | React.ReactNode;
// } & React.InputHTMLAttributes<HTMLInputElement> &
//   React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
//   (
//     {
//       type = "text",
//       id,
//       name,
//       label,
//       placeholder = "",
//       error,
//       width,
//       rows,
//       mandotary,
//       icon,
//       inputPrefix,
//       bgColor = "bg-[#FDFDFD]",
//       borderColor = "border-[#cccccc]",
//       readOnly = false,
//       disabled = false,
//       value,
//       checked,
//       defaultChecked,
//       defaultValue,
//       ...rest
//     },
//     ref
//   ) => {
//     const actualValue = value || defaultValue;

//     if (type === "textarea") {
//       return (
//         <div
//           className={`z-0 group flex flex-col ${width ? width : "w-[400px]"}`}
//         >
//           {label && (
//             <label className="text-sm font-semibold mb-3" htmlFor={name}>
//               {label}{" "}
//               {mandotary && <span className="text-sm text-[#F34747]">*</span>}
//             </label>
//           )}
//           <div className="relative">
//             <textarea
//               id={id}
//               name={name}
//               rows={rows}
//               value={actualValue}
//               placeholder={placeholder}
//               className={`w-full text-sm border ${borderColor} rounded-md
//                  ${bgColor} px-2 py-2  ${error ? "border-red-500" : ""}`}
//               readOnly={readOnly}
//               disabled={disabled}
//               ref={ref as React.Ref<HTMLTextAreaElement>}
//               {...rest}
//             />
//             {icon && (
//               <div
//                 className="group-hover:hidden absolute inset-y-0 right-0 pr-3 flex 
//               items-center pointer-events-none"
//               >
//                 {icon}
//               </div>
//             )}
//           </div>
//           {error && (
//             <span className="text-xs text-red-500 mt-1">
//               {error.toString()}
//             </span>
//           )}
//         </div>
//       );
//     } else if (type === "checkbox") {
//       // Checkbox-specific rendering
//       return (
//         <div
//           className={`z-0 group flex items-center gap-2 ${
//             width ? width : "w-auto"
//           }`}
//         >
//           <div className="flex items-center justify-center gap-3">
//             <input
//               id={id}
//               name={name}
//               type="checkbox"
//               checked={checked}
//               className={`mb-0 text-indigo-600 transition duration-150 ease-in-out
//                  accent-red-500 ${error ? "border-red-500" : ""}`}
//               style={{ marginBottom: 0 }}
//               ref={ref as React.Ref<HTMLInputElement>}
//               readOnly={readOnly}
//               disabled={disabled}
//               defaultChecked={defaultChecked}
//               {...rest}
//             />
//             {label && (
//               <label htmlFor={id} className="text-sm font-semibold">
//                 {label}
//                 {mandotary && <span className="text-sm text-[#F34747]">*</span>}
//               </label>
//             )}
//           </div>
//           {error && (
//             <span className="text-xs text-red-500 mt-1">
//               {error.toString()}
//             </span>
//           )}
//         </div>
//       );
//     } else {
//       // Default input rendering
//       return (
//         <div
//           className={`z-0 group flex flex-col ${width ? width : "w-[400px]"}`}
//         >
//           {label && (
//             <label className="text-sm font-semibold mb-3" htmlFor={name}>
//               {label}{" "}
//               {mandotary && <span className="text-sm text-[#F34747]">*</span>}
//             </label>
//           )}
//           <div
//             className={`flex gap-1 relative border ${borderColor} rounded-md ${
//               error ? "border-red-500" : ""
//             }`}
//           >
//             {inputPrefix && (
//               <span className="flex items-center px-2 pl-4 text-sm font-semibold rounded-l-md">
//                 {inputPrefix}
//               </span>
//             )}
//             <input
//               id={id}
//               name={name}
//               type={type}
//               value={actualValue}
//               placeholder={placeholder}
//               className={`text-sm ${
//                 type === "date" && "uppercase"
//               } px-2 py-2 w-full focus:outline-none ${bgColor} ${
//                 inputPrefix ? "rounded-r-md" : "rounded-md"
//               }`}
//               ref={ref as React.Ref<HTMLInputElement>}
//               readOnly={readOnly}
//               disabled={disabled}
//               {...rest}
//             />
//             {icon && (
//               <div className="group-hover:hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                 {icon}
//               </div>
//             )}
//           </div>
//           {error && (
//             <span className="text-xs text-red-500 mt-1">
//               {error.toString()}
//             </span>
//           )}
//         </div>
//       );
//     }
//   }
// );

// export { Input };

import React, { forwardRef } from "react";

type InputProps = {
  type?: React.HTMLInputTypeAttribute | "textarea";
  id?: string;
  name?: string;
  mandotary?: boolean;
  placeholder?: string;
  className?: string;
  rows?: number;
  width?: string;
  error?: string;
  label?: string;
  min?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  inputPrefix?: string | React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      label,
      placeholder = "",
      error,
      width,
      rows,
      mandotary,
      icon,
      inputPrefix,
      bgColor = "bg-[#FDFDFD]",
      borderColor = "border-[#cccccc]",
      readOnly = false,
      disabled = false,
      value,
      checked,
      ...rest
    },
    ref
  ) => {
    if (type === "textarea") {
      return (
        <div className={`z-0 group flex flex-col ${width || "w-[400px]"}`}>
          {label && (
            <label className="text-sm font-semibold mb-3" htmlFor={name}>
              {label}
              {mandotary && <span className="text-sm text-[#F34747]">*</span>}
            </label>
          )}
          <div className="relative">
            <textarea
              id={id}
              name={name}
              rows={rows}
              value={value ?? ""}
              placeholder={placeholder}
              className={`w-full text-sm border ${borderColor} rounded-md ${bgColor} px-2 py-2 ${
                error ? "border-red-500" : ""
              }`}
              readOnly={readOnly}
              disabled={disabled}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...rest}
            />
            {icon && (
              <div className="group-hover:hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
          </div>
          {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
      );
    } else if (type === "checkbox") {
      return (
        <div className={`z-0 group flex items-center gap-2 ${width || "w-auto"}`}>
          <div className="flex items-center justify-center gap-3">
            <input
              id={id}
              name={name}
              type="checkbox"
              checked={checked}
              className={`mb-0 text-indigo-600 transition duration-150 ease-in-out accent-red-500 ${
                error ? "border-red-500" : ""
              }`}
              ref={ref as React.Ref<HTMLInputElement>}
              readOnly={readOnly}
              disabled={disabled}
              {...rest}
            />
            {label && (
              <label htmlFor={id} className="text-sm font-semibold">
                {label}
                {mandotary && <span className="text-sm text-[#F34747]">*</span>}
              </label>
            )}
          </div>
          {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
      );
    } else {
      return (
        <div className={`z-0 group flex flex-col ${width || "w-[400px]"}`}>
          {label && (
            <label className="text-sm font-semibold mb-3" htmlFor={name}>
              {label}
              {mandotary && <span className="text-sm text-[#F34747]">*</span>}
            </label>
          )}
          <div
            className={`flex gap-1 relative border ${borderColor} rounded-md ${
              error ? "border-red-500" : ""
            }`}
          >
            {inputPrefix && (
              <span className="flex items-center px-2 pl-4 text-sm font-semibold rounded-l-md">
                {inputPrefix}
              </span>
            )}
            <input
              id={id}
              name={name}
              type={type}
              value={value ?? ""}
              placeholder={placeholder}
              className={`text-sm ${type === "date" && "uppercase"} px-2 py-2 w-full focus:outline-none ${bgColor} ${
                inputPrefix ? "rounded-r-md" : "rounded-md"
              }`}
              ref={ref as React.Ref<HTMLInputElement>}
              readOnly={readOnly}
              disabled={disabled}
              {...rest}
            />
            {icon && (
              <div className="group-hover:hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
          </div>
          {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
      );
    }
  }
);

export { Input };

