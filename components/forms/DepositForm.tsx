import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient'; // ✅ import user hook

type Props = {
  accountType: 'Checking' | 'Savings';
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  swiftCode?: string;
  onSubmit: (data: { amount: number; method: 'ACH' | 'Wire' }) => void;
  onClose: () => void;
  isSubmitting?: boolean;
  error?: string | null;
};

export default function DepositForm({
  accountType,
  bankName,
  routingNumber,
  accountNumber,
  swiftCode,
  onSubmit,
  onClose,
  isSubmitting,
  error,
}: Props) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'ACH' | 'Wire'>('ACH');
  const user = useUser(); // ✅ get current user

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Customer'; // ✅ safer fallback logic

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;
    onSubmit({ amount: parsedAmount, method });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-indigo-800">
          {accountType} Deposit Form
        </h3>
        <button onClick={onClose} className="text-red-500 font-semibold">
          Close
        </button>
      </div>

      <p className="text-sm mb-2 text-gray-600">
        Account Name: <strong>{fullName}</strong>
      </p>
      <p className="text-sm mb-4 text-gray-600">
        Bank Name: <strong>{bankName}</strong>
      </p>

      <p className="text-xs text-gray-500 italic mb-4">
        ✅ Direct deposits (ACH) are processed <strong>2 days earlier</strong>.<br />
        ✅ Checks (Wire) are processed <strong>same day</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Deposit Amount (USD)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Transfer Method</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="method"
                value="ACH"
                checked={method === 'ACH'}
                onChange={() => setMethod('ACH')}
              />{' '}
              ACH
            </label>
            <label>
              <input
                type="radio"
                name="method"
                value="Wire"
                checked={method === 'Wire'}
                onChange={() => setMethod('Wire')}
              />{' '}
              Wire
            </label>
          </div>
        </div>

        <div className="text-sm text-gray-700 bg-gray-50 p-3 border rounded">
          <p><strong>Bank Details:</strong></p>
          <p>Bank Name: {bankName}</p>
          <p>Routing Number: {routingNumber}</p>
          <p>Account Number: {accountNumber}</p>
          {method === 'Wire' && swiftCode && <p>SWIFT Code: {swiftCode}</p>}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {isSubmitting ? 'Processing...' : 'Submit Deposit'}
        </button>
      </form>
    </div>
  );
}
