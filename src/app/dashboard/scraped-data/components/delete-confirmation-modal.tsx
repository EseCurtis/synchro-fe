"use client";
import { FC } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title: string;
  message: string;
  itemCount?: number;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  title,
  message,
  itemCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-red-600">{title}</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">{message}</p>
          {itemCount !== undefined && itemCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ You are about to delete {itemCount} event
                {itemCount > 1 ? "s" : ""}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500">
            This action cannot be undone. The event and all its related data
            will be permanently deleted.
          </p>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

