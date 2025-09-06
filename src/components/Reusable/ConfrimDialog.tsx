import React from "react";
import { Button } from "./Button";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

const ConfirmDialog: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            size="small"
            onClick={onClose}
            width="w-24"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={onConfirm}
            width="w-24"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
