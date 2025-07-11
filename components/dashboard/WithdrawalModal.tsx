// components/dashboard/WithdrawalModal.tsx
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // <-- UPDATED IMPORT

// Define interfaces
interface User {
  id: string;
  balance: number;
}

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentBalance: number;
  onWithdraw: (amount: number) => void;
}

const WithdrawalModal = ({ isOpen, onClose, userId, currentBalance, onWithdraw }: WithdrawalModalProps) => {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient(); // <-- USE THE NEW CLIENT FUNCTION

  const handleWithdrawal = async () => {
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (withdrawalAmount > currentBalance) {
      setError('Insufficient funds.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newBalance = currentBalance - withdrawalAmount;
      const { error: updateError } = await supabase
        .from('users')
        .update({ balance: newBalance })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      onWithdraw(newBalance);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setAmount('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2 w-full mb-4"
          disabled={loading}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded" disabled={loading}>Cancel</button>
          <button onClick={handleWithdrawal} className="bg-red-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Withdrawing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
