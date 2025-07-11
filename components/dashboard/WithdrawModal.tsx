import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdrawSuccess?: () => void;
  accountBalance: number;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onWithdrawSuccess,
  accountBalance
}: WithdrawModalProps) {
  const supabase = useSupabaseClient();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > accountBalance) {
      setError('Insufficient funds');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create transaction record
      const { error: txError } = await supabase.from('transactions').insert([
        {
          user_id: user.id,
          amount: withdrawAmount,
          type: 'withdrawal',
          description: 'Customer withdrawal'
        }
      ]);

      if (txError) throw txError;

      onWithdrawSuccess?.();
      onClose();
    } catch (err) {
      // ✅ Fix: Safely handle unknown error type
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-indigo-800 mb-4">Withdraw Funds</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Balance
            </label>
            <p className="text-gray-600">${accountBalance.toFixed(2)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
