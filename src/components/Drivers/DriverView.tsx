import React from "react";
import { DriversPaginatedDataType } from "../../types/Drivers.types";

interface DriverViewProps {
  setIsDriverViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDriver: DriversPaginatedDataType | undefined;
}

const DriverView: React.FC<DriverViewProps> = ({
  setIsDriverViewOpen,
  selectedDriver,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsDriverViewOpen(false)}
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={() => setIsDriverViewOpen(false)}
      >
        <div
          className="w-[1100px] max-h-[90vh] bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-8 py-6 bg-gray-50 rounded-t-xl">
            <h2 className="text-2xl font-bold text-gray-800">Driver Details</h2>
            <button
              onClick={() => setIsDriverViewOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 overflow-y-auto h-[520px]">
            {/* Driver Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Driver Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Full Name:</span>{" "}
                  {selectedDriver?.fullName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Type:</span>{" "}
                  {selectedDriver?.type}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Mobile:</span>{" "}
                  {selectedDriver?.mobileNo}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {selectedDriver?.email || "---"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">License No:</span>{" "}
                  {selectedDriver?.licenseNo}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    License Expiry:
                  </span>{" "}
                  {selectedDriver?.drivingLicenseExpireDate.split("T")[0]}
                  {selectedDriver?.isLicenseExpired && (
                    <span className="ml-2 text-red-600 font-semibold">
                      (Expired)
                    </span>
                  )}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      selectedDriver?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedDriver?.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Age:</span>{" "}
                  {selectedDriver?.age} years
                </p>
              </div>
            </div>

            {/* Address */}
            {selectedDriver?.address && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Address
                </h3>
                <p className="text-sm text-gray-700">
                  {selectedDriver.address.street}, {selectedDriver.address.city}
                  , {selectedDriver.address.state},{" "}
                  {selectedDriver.address.zipCode}
                </p>
              </div>
            )}

            {/* Emergency Contact */}
            {selectedDriver?.emergencyContact && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <span className="font-medium text-gray-600">Name:</span>{" "}
                    {selectedDriver.emergencyContact.name !== ""
                      ? selectedDriver.emergencyContact.name
                      : "---"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Phone:</span>{" "}
                    {selectedDriver.emergencyContact.phone !== ""
                      ? selectedDriver.emergencyContact.phone
                      : "---"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Relationship:
                    </span>{" "}
                    {selectedDriver.emergencyContact.relationship !== ""
                      ? selectedDriver.emergencyContact.relationship
                      : "---"}
                  </p>
                </div>
              </div>
            )}

            {/* Employment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Employment Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Salary:</span> Rs.{" "}
                  {selectedDriver?.salary?.toLocaleString() ?? 0}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Join Date:</span>{" "}
                  {selectedDriver?.joinDate?.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverView;
