// components/dashboard/WithdrawForm.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

interface WithdrawFormProps {
  userId: string;
  onWithdrawSuccess: () => void; // Callback to refresh balance/transactions after withdrawal
}

export default function WithdrawForm({ userId, onWithdrawSuccess }: WithdrawFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (amount <= 0) {
      toast.error('Please enter a positive amount to withdraw.');
      setLoading(false);
      return;
    }
    if (!userId) {
      toast.error('User not logged in.');
      setLoading(false);
      return;
    }

    try {
      // --- IMPORTANT: This is a simplified client-side transaction logic. ---
      // For production-grade applications, especially for financial transactions,
      // it is highly recommended to perform sensitive operations like
      // updating balances via secure server-side functions (e.g., Supabase Functions,
      // Next.js API Routes, or Server Actions) to enforce security rules and prevent tampering.

      // Fetch current balance
      const { data: currentBalanceData, error: fetchError } = await supabase
        .from('balances')
        .select('amount')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw fetchError;
      }

      const currentBalance = currentBalanceData?.amount || 0;

      if (amount > currentBalance) {
        toast.error('Insufficient funds.');
        setLoading(false);
        return;
      }

      const newBalance = currentBalance - amount;

      // Update balance
      const { error: updateError } = await supabase
        .from('balances')
        .upsert(
          { user_id: userId, amount: newBalance },
          { onConflict: 'user_id' }
        );

      if (updateError) {
        throw updateError;
      }

      // Record the withdrawal transaction
      const { error: transactionError } = await supabase
        .from('transactions') // Assuming a 'transactions' table
        .insert({
          sender_user_id: userId,
          amount: amount,
          type: 'withdrawal',
          status: 'completed',
          // For withdrawals, receiver_account_number, bank_name, routing_number, method
          // might be required depending on your schema. For simplicity, leaving them out
          // or setting to defaults if not directly applicable.
          receiver_account_number: 'N/A', // Placeholder
          bank_name: 'N/A', // Placeholder
          routing_number: 'N/A', // Placeholder
          method: 'Bank Transfer', // Example method
        });

      if (transactionError) {
        console.error('Error recording withdrawal transaction:', transactionError.message);
        // Even if transaction recording fails, balance update might have succeeded.
        // Consider robust rollback/compensation logic for production.
      }

      toast.success('Withdrawal successful!');
      setAmount(0); // Reset amount input
      onWithdrawSuccess(); // Trigger callback to refresh parent component's data (e.g., balance)

    } catch (error: any) {
      console.error('Withdrawal error:', error.message);
      toast.error(`Withdrawal failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
      <form onSubmit={handleWithdraw}>
        <div className="mb-4">
          <label htmlFor="withdrawAmount" className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            id="withdrawAmount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            min="0"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
}
