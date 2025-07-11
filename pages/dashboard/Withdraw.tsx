// pages/dashboard/Withdraw.tsx
'use client'; // This directive marks the page as a Client Component.

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is your custom auth hook
// Import createBrowserClient for client-side Supabase interactions.
import { createBrowserClient } from '@supabase/ssr';
import WithdrawalForm from '@/components/dashboard/WithdrawalForm'; // Assuming this component exists
import toast, { Toaster } from 'react-hot-toast'; // Assuming react-hot-toast for notifications
import Layout from '@/components/Layout'; // Assuming your Layout component exists

// Define interface for Balance
interface Balance {
  amount: number;
}

export default function WithdrawPage() {
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading state
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true);
  const [errorBalance, setErrorBalance] = useState<string | null>(null);

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

  // Effect to fetch balance when the component mounts or user changes
  useEffect(() => {
    if (!authLoading && user) { // Only fetch data once user auth state is known and user is logged in
      fetchBalance();
    }
  }, [user, authLoading, supabase]); // Dependencies

  // Callback function to refresh balance after a successful withdrawal
  const handleWithdrawSuccess = () => {
    fetchBalance(); // Re-fetch balance to reflect the change
    // You might also want to trigger a refresh for transaction history here if needed
  };

  if (authLoading || loadingBalance) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-700">Loading withdrawal page...</p>
        </div>
      </Layout>
    );
  }

  if (errorBalance) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-red-600">
          <p className="text-lg">Error: {errorBalance}</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600">Please log in to make a withdrawal.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Toaster /> {/* Place Toaster at a high level to display notifications */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Withdraw Funds</h1>

        {/* Display Current Balance */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Current Balance:</h2>
          <p className="text-4xl font-extrabold text-red-600">
            ${balance !== null ? balance.toFixed(2) : '0.00'}
          </p>
        </div>

        {/* Withdrawal Form */}
        {/* Pass userId and the success callback to the WithdrawalForm */}
        <WithdrawalForm userId={user.id} onWithdrawSuccess={handleWithdrawSuccess} />
      </div>
    </Layout>
  );
}
