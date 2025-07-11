// components/dashboard/DepositModal.tsx
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // <-- UPDATED IMPORT

// Define interfaces
interface User {
  id: string;
  balance: number;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onDeposit: (amount: number) => void;
}

const DepositModal = ({ isOpen, onClose, userId, onDeposit }: DepositModalProps) => {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient(); // <-- USE THE NEW CLIENT FUNCTION

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First, get the current user's balance
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('balance')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        throw userError || new Error('User not found');
      }

      const newBalance = userData.balance + depositAmount;

      // Now, update the balance
      const { error: updateError } = await supabase
        .from('users')
        .update({ balance: newBalance })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      onDeposit(newBalance);
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
        <h2 className="text-xl font-bold mb-4">Deposit Funds</h2>
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
          <button onClick={handleDeposit} className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Depositing...' : 'Deposit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
