// components/dashboard/WithdrawSection.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState, useEffect } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
import WithdrawForm from './WithdrawForm'; // Assuming this component exists
import NewRecipientForm from './NewRecipientForm'; // Assuming this component exists
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

export default function WithdrawSection() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true);
  const [errorBalance, setErrorBalance] = useState<string | null>(null);
  const { user } = useAuth(); // Get user from your auth hook

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Function to fetch the user's balance
  const fetchBalance = async () => {
    if (!user?.id) {
      setErrorBalance('User not authenticated. Cannot fetch balance.');
      setLoadingBalance(false);
      return;
    }

    setLoadingBalance(true);
    setErrorBalance(null);

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
      setErrorBalance(`Failed to load balance: ${err.message}`);
      toast.error(`Failed to load balance: ${err.message}`);
    } finally {
      setLoadingBalance(false);
    }
  };

  // useEffect to fetch balance when the component mounts or user changes
  useEffect(() => {
    fetchBalance();
  }, [user?.id, supabase]); // Dependencies: re-run if user.id or supabase client changes

  // Callback function to refresh balance after a successful withdrawal
  const handleWithdrawSuccess = () => {
    fetchBalance(); // Re-fetch balance to reflect the change
    // You might also want to trigger a refresh for transaction history here if needed
  };

  if (loadingBalance) {
    return <div className="text-center p-6">Loading balance...</div>;
  }

  if (errorBalance) {
    return <div className="text-center p-6 text-red-600">Error: {errorBalance}</div>;
  }

  if (!user?.id) {
    return <div className="text-center p-6 text-gray-600">Please log in to manage withdrawals.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Management</h2>

      {/* Display Current Balance */}
      <div className="mb-6 p-4 border rounded-lg bg-blue-50 text-blue-800">
        <p className="text-lg font-semibold">Your Current Balance:</p>
        <p className="text-3xl font-bold">${balance !== null ? balance.toFixed(2) : 'N/A'}</p>
      </div>

      {/* Withdrawal Form */}
      <div className="mb-8">
        <WithdrawForm userId={user.id} onWithdrawSuccess={handleWithdrawSuccess} />
      </div>

      {/* New Recipient Form (if applicable to withdrawal flow, otherwise remove) */}
      {/* This component might be for transfers, not direct withdrawals, so review its relevance here. */}
      {/* If it's for transfer recipients, you might want a separate "Transfer" section. */}
      <div className="mt-8">
        <NewRecipientForm userId={user.id} onSuccess={() => toast.success('Recipient added!')} />
      </div>
    </div>
  );
}
