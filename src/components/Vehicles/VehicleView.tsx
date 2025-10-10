import React from "react";
import { VehiclePaginatedDataType } from "../../types/Vehicle.types";

interface VehicleViewProps {
  setIsVehicleViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingVehicle: VehiclePaginatedDataType | undefined;
}

const VehicleView: React.FC<VehicleViewProps> = ({
  setIsVehicleViewOpen,
  editingVehicle,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsVehicleViewOpen(false)}
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={() => setIsVehicleViewOpen(false)}
      >
        <div
          className="w-[1100px] max-h-[90vh] bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-8 py-6 bg-gray-50 rounded-t-xl">
            <h2 className="text-2xl font-bold text-gray-800">
              Vehicle Details
            </h2>
            <button
              onClick={() => setIsVehicleViewOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 overflow-y-auto h-[350px]">
            {/* Driver Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">
                    Plate Number:
                  </span>{" "}
                  {editingVehicle?.plateNumber}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Brand:</span>{" "}
                  {editingVehicle?.model.brand}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Model Name:</span>{" "}
                  {editingVehicle?.model.modelName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">year:</span>{" "}
                  {editingVehicle?.year}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Rate card:</span>{" "}
                  {editingVehicle?.model.rateCard || "---"}
                </p>
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Ownership Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Ownership:</span>{" "}
                  {editingVehicle?.ownership}
                </p>
                {editingVehicle?.ownership === "Third-Party" && (
                  <>
                    <p>
                      <span className="font-medium text-gray-600">
                        Owner name:
                      </span>{" "}
                      {editingVehicle?.ownerName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Owner phone:
                      </span>{" "}
                      {editingVehicle?.ownerPhone}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Owner address:
                      </span>{" "}
                      {editingVehicle?.ownerAddress}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleView;
