import React from "react";
import { cn } from "../../lib/utils";
import { Pagination } from "./Pagination";
import { SkeletonLoader } from "./SkeletonLoader";

export interface TableHeaderType<T> {
  key: keyof T | null;
  label: string | React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
}

interface TableProps<T extends Record<string, any>> {
  headers: TableHeaderType<T>[];
  onRowClick?: (row: T) => void;
  data: T[];
  bodyBackgroundColor?: string;
  currentPage?: number;
  totalPages?: number;
  type?: string;
  loading?: boolean;
  isPaginated?: boolean;
  headerStyle?: "default" | "primary" | "secondary"; // Add headerStyle prop
  cellStyle?: "default" | "bordered" | "padded"; // Add cellStyle prop
}

const TableNew = <T extends Record<string, any>>({
  headers,
  data,
  headerStyle = "default", // Default value for headerStyle
  cellStyle = "default", // Default value for cellStyle
  bodyBackgroundColor,
  currentPage,
  totalPages,
  type,
  loading = false,
  isPaginated = false,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div>
      {loading ? (
        <div>
          <SkeletonLoader />
        </div>
      ) : (
        <div className="overflow-scroll w-full rounded-md border hide-scrollbar">
          <table className="min-w-full">
            <thead
              className={cn(
                "min-w-full rounded-md", // Base styles
                headerStyle === "default" &&
                  "bg-[#F8F8F8] text-[#232323] font-semibold", // Default header style
                headerStyle === "primary" &&
                  "bg-[#F8F8F8] text-white font-semibold", // Primary header style
                headerStyle === "secondary" &&
                  "bg-gray-200 text-gray-600 font-medium" // Secondary header style
              )}
            >
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={`${header.label}-${index}`}
                    className={`py-3 px-4 text-left ${
                      header.width ? header.width : "w-auto"
                    }`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            {data.length > 0 ? (
              <tbody
                className={`rounded-md ${bodyBackgroundColor} ${
                  onRowClick && "cursor-pointer"
                }`}
              >
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "min-w-full border", // Base styles
                      cellStyle === "default" &&
                        `text-sm text-[#323232] font-medium border-x-0 ${
                          index === data.length - 1 && "border-b-0"
                        }`, // Default cell style
                      cellStyle === "bordered" &&
                        `text-sm text-[#323232] font-medium border-x-0 ${
                          index !== data.length - 1 && "border-b"
                        } border-gray-200`, // Bordered cell style
                      cellStyle === "padded" &&
                        "text-sm text-[#323232] font-medium p-4 border-x-0" // Padded cell style
                    )}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {headers.map((header, headerIndex) => (
                      <td
                        key={`${String(
                          header.key ?? "default"
                        )}-${index}-${headerIndex}`}
                        className={`py-3 px-4 bg-white ${
                          header.width ? header.width : "w-auto"
                        } ${header.key !== "email" && "capitalize"}`}
                      >
                        {header.render
                          ? header.render(item, index)
                          : (item[header.key as keyof T] ?? "---") === "" ||
                            item[header.key as keyof T] == null
                          ? "---"
                          : (item[header.key as keyof T] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={headers.length}
                    className="py-6 text-center text-sm text-[#6b6b6b] h-80 relative"
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      No Data
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      )}
      {isPaginated && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage ?? 1}
            totalPages={totalPages ?? 1}
            type={type ?? ""}
          />
        </div>
      )}
    </div>
  );
};

export { TableNew };
