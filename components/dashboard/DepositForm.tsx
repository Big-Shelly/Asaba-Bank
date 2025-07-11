import { useState } from 'react';

interface Props {
  accountType: 'Checking' | 'Savings';
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  isSubmitting: boolean;
  onSubmit: (data: { amount: number; method: 'ACH' | 'Wire' }) => void;
  onClose: () => void;
}

export default function DepositForm({
  accountType,
  accountName,
  accountNumber,
  bankName,
  routingNumber,
  isSubmitting,
  onSubmit,
  onClose
}: Props) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'ACH' | 'Wire'>('ACH');
  const [confirming, setConfirming] = useState(false);

  const handleSubmit = async () => {
    if (!amount || isNaN(Number(amount))) return alert('Enter a valid amount.');

    const confirmed = window.confirm(`Deposit $${amount} via ${method} to your ${accountType} account?`);
    if (!confirmed) return;

    setConfirming(true);
    await new Promise((res) => setTimeout(res, 3000));
    onSubmit({ amount: Number(amount), method });
    setConfirming(false);
  };

  return (
    <div className="bg-blue-50 border border-blue-300 rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-900">
          Deposit to {accountType} Account
        </h2>
        <button onClick={onClose} className="text-sm text-red-500 underline">Change Account</button>
      </div>

      <div className="space-y-2 text-sm text-gray-800">
        <p><strong>Account Name:</strong> {accountName}</p>
        <p><strong>Bank Name:</strong> {bankName}</p>
        <p><strong>Account Number:</strong> {accountNumber}</p>
        <p><strong>Routing Number:</strong> {routingNumber}</p>
        {method === 'Wire' && (
          <p><strong>SWIFT Code:</strong> ASBNUS33</p>
        )}
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium mb-1">Amount (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={confirming || isSubmitting}
        />
      </div>

      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${method === 'ACH' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMethod('ACH')}
        >
          ACH Transfer
        </button>
        <button
          className={`px-4 py-2 rounded ${method === 'Wire' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMethod('Wire')}
        >
          Wire Transfer
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={confirming || isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {confirming ? 'Hold on... Confirming' : 'Submit Deposit'}
      </button>
    </div>
  );
}
