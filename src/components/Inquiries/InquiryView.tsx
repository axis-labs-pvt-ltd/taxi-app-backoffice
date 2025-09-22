import React from "react";
import { InquiryPaginatedDataType } from "../../types/Inquiries.types";

interface InquiryViewProps {
  setIsInquiryViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInquiry: InquiryPaginatedDataType | undefined;
}

const InquiryView: React.FC<InquiryViewProps> = ({
  setIsInquiryViewOpen,
  selectedInquiry,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsInquiryViewOpen(false)}
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={() => setIsInquiryViewOpen(false)}
      >
        <div
          className="w-[1100px] max-h-[90vh] bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-8 py-6 bg-gray-50 rounded-t-xl">
            <h2 className="text-2xl font-bold text-gray-800">
              Inquiry Details
            </h2>
            <button
              onClick={() => setIsInquiryViewOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-4 overflow-y-auto">
            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Name:</span>{" "}
                  {selectedInquiry?.fullName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {selectedInquiry?.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {selectedInquiry?.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      selectedInquiry?.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedInquiry?.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Trip Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Trip Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Date:</span>{" "}
                  {selectedInquiry?.tourDate.split("T")[0]}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Pickup:</span>{" "}
                  {selectedInquiry?.pickup?.name}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Drop:</span>{" "}
                  {selectedInquiry?.drop?.name}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Distance:</span>{" "}
                  {selectedInquiry?.totalDistance?.toFixed(1)} km (Actual:{" "}
                  {selectedInquiry?.actualTotalDistance} km)
                </p>
                <p>
                  <span className="font-medium text-gray-600">Meter:</span>{" "}
                  {selectedInquiry?.startMeter} → {selectedInquiry?.endMeter}
                </p>
              </div>
            </div>

            {/* Vehicle Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Model:</span>{" "}
                  {selectedInquiry?.vehicleModelId?.brand}{" "}
                  {selectedInquiry?.vehicleModelId?.modelName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Type:</span>{" "}
                  {selectedInquiry?.vehicleModelId?.type}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Assigned:</span>{" "}
                  {selectedInquiry?.vehicleAssigned?.plateNumber ?? "---"}
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Pricing
              </h3>
              <div className="flex items-center gap-8 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Estimated:</span>{" "}
                  Rs. {selectedInquiry?.estimatedPrice?.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Final:</span>
                  <span className="ml-1 font-bold text-gray-900">
                    Rs. {selectedInquiry?.finalPrice?.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Extra Services */}
            {/* {selectedInquiry?.extraServices?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Extra Services
                </h3>
                <ul className="list-disc pl-6 text-sm text-gray-700">
                  {selectedInquiry.extraServices.map((service) => (
                    <li key={service._id}>
                      Service ID: {service.id} × {service.qty}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryView;
