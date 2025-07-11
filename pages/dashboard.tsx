// pages/dashboard.tsx
'use client'; // This directive marks the page as a Client Component.

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is your custom auth hook
// Import createBrowserClient for client-side Supabase interactions.
import { createBrowserClient } from '@supabase/ssr';
import DepositSection from '@/components/dashboard/DepositSection'; // Assuming these components exist
import WithdrawalForm from '@/components/dashboard/WithdrawalForm'; // Import WithdrawalForm
import TransactionList from '@/components/dashboard/TransactionList';
import RecipientManager from '@/components/dashboard/RecipientManager';
import Tickets from '@/components/dashboard/Tickets';
import Layout from '@/components/Layout'; // Assuming your Layout component exists
import toast from 'react-hot-toast'; // Assuming react-hot-toast for notifications

// Define interfaces for data you might fetch (adjust based on your Supabase schema)
interface Balance {
  amount: number;
}

interface Transaction {
  id: string;
  sender_user_id: string;
  receiver_account_number: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  bank_name: string;
  routing_number: string;
  method: string;
  account_number: string; // Ensure this matches TransactionList's interface
}

// Helper function to get greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading state
  const [balance, setBalance] = useState<number | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Function to fetch user's balance and recent transactions
  const fetchData = async () => {
    if (!user?.id) {
      // If user is not authenticated, don't try to fetch data
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    setError(null);

    try {
      // Fetch balance
      const { data: balanceData, error: balanceError } = await supabase
        .from('balances')
        .select('amount')
        .eq('user_id', user.id)
        .single();

      if (balanceError && balanceError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw balanceError;
      }
      setBalance(balanceData?.amount ?? 0);

      // Fetch recent transactions (e.g., last 5)
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .or(`sender_user_id.eq.${user.id},receiver_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(5); // Limit to 5 recent transactions

      if (transactionsError) {
        throw transactionsError;
      }

      // Map transactions to include 'account_number' if your 'Transactions' component expects it
      const formattedTransactions = (transactionsData || []).map(t => ({
        ...t,
        account_number: t.receiver_account_number || '', // Map receiver_account_number to account_number
        bank_name: t.bank_name || '',
        routing_number: t.routing_number || '',
        method: t.method || '',
      })) as Transaction[];

      setRecentTransactions(formattedTransactions);

    } catch (err: any) {
      console.error('Error fetching dashboard data:', err.message);
      setError(`Failed to load dashboard data: ${err.message}`);
      toast.error(`Failed to load dashboard data: ${err.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  // Effect to fetch data when user changes or on component mount
  useEffect(() => {
    if (!authLoading && user) { // Only fetch data once user auth state is known and user is logged in
      fetchData();
    }
  }, [user, authLoading, supabase]); // Dependencies

  // Callback function to refresh balance and transactions after a successful withdrawal
  const handleWithdrawSuccess = () => {
    fetchData(); // Re-fetch all dashboard data
    toast.success('Withdrawal successful!'); // Optional: Add a success toast here as well
  };

  if (authLoading || loadingData) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-700">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-red-600">
          <p className="text-lg">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  // If not authenticated, redirect to login (handled by useAuth or explicit check)
  if (!user) {
    // This case should ideally be handled by the useAuth hook's redirect,
    // but as a fallback, we can show a message or redirect explicitly here.
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          {getGreeting()}, {user.email?.split('@')[0] || 'User'}!
        </h1>

        {/* Balance Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Current Balance</h2>
          <p className="text-4xl font-extrabold text-green-600">
            ${balance !== null ? balance.toFixed(2) : '0.00'}
          </p>
        </div>

        {/* Deposit and Withdrawal Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* DepositSection already handles its own Supabase client and refresh */}
          <DepositSection />
          {/* Pass userId and onWithdrawSuccess to WithdrawalForm */}
          <WithdrawalForm userId={user.id} onWithdrawSuccess={handleWithdrawSuccess} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-600">No recent transactions found.</p>
          ) : (
            <TransactionList transactions={recentTransactions} />
          )}
        </div>

        {/* Other Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecipientManager userId={user.id} />
          <Tickets />
        </div>
      </div>
    </Layout>
  );
}
