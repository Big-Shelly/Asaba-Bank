// components/dashboard/DepositModal.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState } from 'react'; // useState might be used for local modal state, e.g., input fields if any

// Define the props interface for the DepositModal component
interface DepositModalProps {
  isOpen: boolean; // Controls the visibility of the modal
  onClose: () => void; // Callback function to close the modal
  onDeposit: () => Promise<void>; // Callback function to trigger the deposit logic in the parent
  amount: number; // The amount to be confirmed for deposit
}

export default function DepositModal({ isOpen, onClose, onDeposit, amount }: DepositModalProps) {
  // If the modal is not open, return null to render nothing
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Confirm Deposit</h3>
        <p className="mb-4">Are you sure you want to deposit ${amount.toFixed(2)}?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDeposit} // Call the onDeposit callback passed from the parent
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirm Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
