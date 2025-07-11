import { useState } from 'react';
import { createClient } from '@supabase/ssr';

// Define interfaces (can be moved to a shared types.ts file)
interface User {
  id: string;
  email?: string;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess?: () => void;
  accountType: 'Checking' | 'Savings';
  userId: string;
  bankName: string; // Added to match DepositSection.tsx
}

export default function DepositModal({
  isOpen,
  onClose,
  onDepositSuccess,
  accountType,
  userId,
  bankName,
}: DepositModalProps) {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: () => undefined,
        set: () => undefined,
        remove: () => undefined,
      },
    }
  );

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [depositMethod, setDepositMethod] = useState<'ACH' | 'Wire'>('ACH');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeposit = async () => {
    const numericAmount = parseFloat(amount);
    if (!amount || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (numericAmount < 5) {
      setError('Minimum deposit amount is $5.00');
      return;
    }

    setIsConfirming(true);
    const confirmation = window.confirm(
      `Confirm deposit of ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(numericAmount)} via ${depositMethod}?`
    );

    if (!confirmation) {
      setIsConfirming(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Validate userId matches authenticated user
      if (user.id !== userId) {
        throw new Error('User ID mismatch');
      }

      // Create transaction record
      const { error: txError } = await supabase.from('transactions').insert([
        {
          user_id: user.id,
          amount: numericAmount,
          type: 'deposit',
          description: `${depositMethod} deposit to ${accountType} account`,
          method: depositMethod,
          account_type: accountType.toLowerCase(), // Ensure consistency with accounts table
          status: 'pending',
        },
      ]);

      if (txError) throw txError;

      onDepositSuccess?.();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
      setIsConfirming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-indigo-800 mb-4">
          Deposit to {accountType} Account
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="space-y-4">
          {/* Deposit method toggles */}
          <div className="flex items-center mb-4">
            <button
              onClick={() => setDepositMethod('ACH')}
              className={`flex-1 px-4 py-3 rounded-lg ${
                depositMethod === 'ACH'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ACH Transfer
            </button>
            <button
              onClick={() => setDepositMethod('Wire')}
              className={`flex-1 px-4 py-3 rounded-lg ${
                depositMethod === 'Wire'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Wire Transfer
            </button>
          </div>

          {/* Wire instructions */}
          {depositMethod === 'Wire' && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                For wire transfers, please include your account number and
                reference code:
              </p>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  Bank: {bankName} (SWIFT: <strong>ASBNUS33</strong>)
                </p>
                <p className="text-sm text-gray-600">
                  Reference: <strong>DEP-{userId.slice(0, 8)}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Amount input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Amount
                </label>
                <span className="text-sm text-gray-500">
                  Minimum: $5.00
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-10 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-3 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              disabled={loading || isConfirming}
              className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isConfirming || loading ? 'Transaction Pending…' : 'Confirm Deposit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
