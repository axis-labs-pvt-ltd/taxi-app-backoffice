import React, { useState, useMemo } from "react";
import { Button } from "../Reusable/Button";
import { Input } from "../Reusable/Input";

interface AddDiscountProps {
  setIsAddDiscountOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReturnTour: boolean | undefined;
  estimatedPrice: number | undefined;
  finalPrice: number | undefined;
  handleUpdateDiscount: (discount: number) => void;
}

const AddDiscount: React.FC<AddDiscountProps> = ({
  setIsAddDiscountOpen,
  isReturnTour,
  estimatedPrice = 0,
  finalPrice = 0,
  handleUpdateDiscount,
}) => {
  const [discountType, setDiscountType] = useState<"percent" | "amount">(
    "percent"
  );
  const [discountValue, setDiscountValue] = useState<number>(0);

  // Calculate discounted price
  const { discountAmount, newFinalPrice } = useMemo(() => {
    const basePrice = isReturnTour ? estimatedPrice / 2 : finalPrice;
    let discountAmt = 0;

    if (discountType === "percent") {
      discountAmt = (basePrice * discountValue) / 100;
    } else {
      discountAmt = discountValue;
    }

    const newPrice = finalPrice - discountAmt;
    return {
      discountAmount: discountAmt,
      newFinalPrice: newPrice < 0 ? 0 : newPrice,
    };
  }, [discountType, discountValue, isReturnTour, estimatedPrice, finalPrice]);

  const handleSubmit = () => {
    handleUpdateDiscount(discountAmount);
    setIsAddDiscountOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div
          className="w-[600px] bg-white shadow-lg rounded-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-2xl font-bold tracking-wider mb-4">Add Discount</p>
          <div className="border-b border-gray-200 mb-6"></div>

          <div className="space-y-4">
            {/* Discount Type */}
            <div>
              <label className="block font-medium mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) =>
                  setDiscountType(e.target.value as "percent" | "amount")
                }
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="percent">Percentage (%)</option>
                <option value="amount">Fixed Amount (Rs.)</option>
              </select>
            </div>

            {/* Discount Value */}
            <div>
              <label className="block font-medium mb-1">Discount Value</label>
              <Input
                type="number"
                value={discountValue || ""}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                placeholder={
                  discountType === "percent"
                    ? "Enter percentage (e.g. 10)"
                    : "Enter amount (e.g. 500)"
                }
                width="w-full"
              />
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md border text-sm space-y-2">
              <p>
                <strong>Base Price:</strong> Rs. {finalPrice}{" "}
                {isReturnTour && "(return trip only)"}
              </p>
              <p>
                <strong>Discount:</strong> Rs. {discountAmount.toFixed(2)}
              </p>
              <p>
                <strong>New Final Price:</strong> Rs. {newFinalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              children="Cancel"
              variant="secondary"
              size="small"
              type="button"
              onClick={() => setIsAddDiscountOpen(false)}
            />
            <Button
              children="Apply Discount"
              variant="primary"
              size="small"
              type="button"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDiscount;
