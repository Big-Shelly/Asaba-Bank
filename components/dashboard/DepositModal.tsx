// components/dashboard/DepositModal.tsx
// (This is a conceptual representation, adapt to your actual file structure)

// Define the props interface for DepositModal
interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: () => Promise<void>;
  amount: number; // <--- ADD THIS LINE
  // Add any other props your DepositModal might already be using
}

export default function DepositModal({ isOpen, onClose, onDeposit, amount }: DepositModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Confirm Deposit</h3>
        <p className="mb-4">Are you sure you want to deposit ${amount.toFixed(2)}?</p> {/* Use the amount prop */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDeposit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
