import React from "react";
import { TourInquiryDataType } from "../../types/TourInquiry.types";

interface TourInquiryViewProps {
  setIsInquiryViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInquiry: TourInquiryDataType | undefined;
}

const TourInquiryView: React.FC<TourInquiryViewProps> = ({
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
              Tour Inquiry Details
            </h2>
            <button
              onClick={() => setIsInquiryViewOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-4 overflow-y-auto h-[520px]">
            {/* Customer Info */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="capitalize">
                  <span className="font-bold text-gray-600 pr-4">Name:</span>{" "}
                  {selectedInquiry?.fullName}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">Phone:</span>{" "}
                  {selectedInquiry?.phone}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">Email:</span>{" "}
                  {selectedInquiry?.email}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">Status:</span>
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
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Trip Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-bold text-gray-600 pr-4">Tour:</span>{" "}
                  {selectedInquiry?.tourId?.title}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">
                    Per Person:
                  </span>{" "}
                  LKR {selectedInquiry?.tourId?.price.toFixed(2)}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">
                    Booking Date:
                  </span>{" "}
                  {selectedInquiry?.bookingDate.split("T")[0]}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">
                    Travel Date:
                  </span>{" "}
                  {selectedInquiry?.travelDate.split("T")[0]}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">
                    Distance:
                  </span>{" "}
                  {selectedInquiry?.totalDistance?.toFixed(1)} km
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">Meter:</span>{" "}
                  {selectedInquiry?.startMeter} → {selectedInquiry?.endMeter}
                </p>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-bold text-gray-600 pr-4">Model:</span>{" "}
                  {selectedInquiry?.vehicleAssigned?.vehicleId?.modelId?.brand}{" "}
                  {
                    selectedInquiry?.vehicleAssigned?.vehicleId?.modelId
                      ?.modelName
                  }
                </p>
                <p className="capitalize">
                  <span className="font-bold text-gray-600 pr-4">Type:</span>{" "}
                  {selectedInquiry?.vehicleAssigned?.vehicleId?.modelId?.type}
                </p>
                <p>
                  <span className="font-bold text-gray-600 pr-4">
                    Assigned:
                  </span>{" "}
                  {selectedInquiry?.vehicleAssigned?.plateNumber ?? "---"}
                </p>
              </div>
            </div>

            {/* Extra Services */}
            {(selectedInquiry?.extraServices?.length ?? 0) > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Extra Services
                </h3>
                <ul className="text-sm text-gray-700">
                  {selectedInquiry?.extraServices.map((service) => (
                    <li key={service.id} className="pb-2">
                      <span className="font-bold text-gray-600 pr-4">
                        {service.name} × {service.qty}
                      </span>
                      → LKR {service.price * service.qty}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Pricing
              </h3>
              <div className="flex items-center gap-8 text-sm">
                <p>
                  <span className="font-bold text-gray-600 pr-4">Final:</span>
                  <span className="ml-1 font-bold text-gray-900">
                    Rs. {selectedInquiry?.finalPrice?.toLocaleString()}
                  </span>
                </p>
              </div>
              {selectedInquiry?.discount && (
                <div className="flex items-center gap-8 text-sm mt-4">
                  <p>
                    <span className="font-bold text-gray-600 pr-4">
                      Return Discount:
                    </span>
                    <span className="ml-1 font-bold text-gray-900 px-2 py-0.5 rounded-full bg-green-100">
                      Rs. {selectedInquiry?.discount?.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-gray-600 pr-4">
                      Discounted Price:
                    </span>
                    <span className="ml-1 font-bold text-gray-900 px-2 py-0.5 rounded-full bg-green-100">
                      Rs.{" "}
                      {(
                        (selectedInquiry?.finalPrice ?? 0) -
                        (selectedInquiry?.discount ?? 0)
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Costs */}
            {(selectedInquiry?.costId?.costs?.length ?? 0) > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Costs
                </h3>
                <ul className="text-sm text-gray-700">
                  {selectedInquiry?.costId?.costs?.map((cost) => (
                    <li key={cost.id} className="pb-2">
                      <span className="font-bold text-gray-600 pr-4">
                        {" "}
                        {cost.costCategoryId.name}:
                      </span>
                      LKR {cost.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TourInquiryView;
