// components/dashboard/WithdrawalForm.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState, useEffect } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
import RecipientManager from './RecipientManager'; // Import RecipientManager as seen in your error log
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

// Define the props for the WithdrawalForm component (adjust as needed)
interface WithdrawalFormProps {
  // If this component receives props (e.g., userId from a parent), define them here.
  // For example: userId: string;
}

export default function WithdrawalForm({}: WithdrawalFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get user from your auth hook

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Function to fetch the user's balance
  const fetchBalance = async () => {
    if (!user?.id) {
      setError('User not authenticated. Cannot fetch balance.');
      setLoading(false); // Use general loading for initial fetch
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('balances') // Assuming your balance data is in a 'balances' table
        .select('amount') // Select the 'amount' column
        .eq('user_id', user.id) // Filter by the current user's ID
        .single(); // Expect a single row for the user's balance

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw fetchError;
      }

      setBalance(data?.amount ?? 0); // Update balance state, default to 0 if no data
    } catch (err: any) {
      console.error('Error fetching balance:', err.message);
      setError(`Failed to load balance: ${err.message}`);
      toast.error(`Failed to load balance: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch balance when the component mounts or user changes
  useEffect(() => {
    fetchBalance();
  }, [user?.id, supabase]); // Dependencies: re-run if user.id or supabase client changes

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (amount <= 0) {
      toast.error('Please enter a positive amount to withdraw.');
      setLoading(false);
      return;
    }
    if (!user?.id) {
      toast.error('User not logged in.');
      setLoading(false);
      return;
    }
    if (balance === null || amount > balance) {
      toast.error('Insufficient funds or balance not loaded.');
      setLoading(false);
      return;
    }

    try {
      // --- IMPORTANT: This is a simplified client-side transaction logic. ---
      // For production-grade applications, especially for financial transactions,
      // it is highly recommended to perform sensitive operations like
      // updating balances via secure server-side functions (e.g., Supabase Functions,
      // Next.js API Routes, or Server Actions) to enforce security rules and prevent tampering.

      const newBalance = balance - amount;

      // Update balance
      const { error: updateError } = await supabase
        .from('balances')
        .upsert(
          { user_id: user.id, amount: newBalance },
          { onConflict: 'user_id' }
        );

      if (updateError) {
        throw updateError;
      }

      // Record the withdrawal transaction
      const { error: transactionError } = await supabase
        .from('transactions') // Assuming a 'transactions' table
        .insert({
          sender_user_id: user.id,
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
      fetchBalance(); // Re-fetch balance to reflect the change
      // You might also want to trigger a refresh for transaction history here if needed
    } catch (error: any) {
      console.error('Withdrawal error:', error.message);
      toast.error(`Withdrawal failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && balance === null) {
    return <div className="text-center p-6">Loading withdrawal form...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }

  if (!user?.id) {
    return <div className="text-center p-6 text-gray-600">Please log in to make a withdrawal.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Process Withdrawal</h2>

      {/* Display Current Balance */}
      <div className="mb-6 p-4 border rounded-lg bg-blue-50 text-blue-800">
        <p className="text-lg font-semibold">Your Current Balance:</p>
        <p className="text-3xl font-bold">${balance !== null ? balance.toFixed(2) : 'N/A'}</p>
      </div>

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

      {/* This component might be for managing recipients for transfers,
          not directly for simple withdrawals. Review its placement. */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Manage Recipient Accounts (for Transfers)</h3>
        {/* Pass userId to RecipientManager if it needs it */}
        <RecipientManager userId={user.id} />
      </div>
    </div>
  );
}
