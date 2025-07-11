// components/dashboard/TransactionHistory.tsx
'use client'; // This directive marks the component as a Client Component.

import { useEffect, useState } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

// Define the interface for a Transaction object, matching your Supabase table structure
interface Transaction {
  id: string;
  sender_user_id: string;
  receiver_account_number: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed'; // Example statuses
  created_at: string;
  type: 'deposit' | 'withdrawal' | 'transfer'; // Example transaction types
}

// Define the props for the TransactionHistory component
interface TransactionHistoryProps {
  // If this component receives any props, define them here.
  // For example, if it needs a specific user ID passed from a parent:
  // userId: string;
}

export default function TransactionHistory({}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get user from your auth hook

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // useEffect to fetch transactions when the component mounts or user changes
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) {
        setError('User not authenticated. Cannot fetch transactions.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // Clear previous errors

      try {
        // Fetch transactions where the current user is either the sender or receiver
        const { data, error: fetchError } = await supabase
          .from('transactions') // Query your 'transactions' table
          .select('*') // Select all columns
          .or(`sender_user_id.eq.${user.id},receiver_user_id.eq.${user.id}`) // Assuming a receiver_user_id column or similar
          .order('created_at', { ascending: false }); // Order by creation date, newest first

        if (fetchError) {
          throw fetchError;
        }

        setTransactions(data || []); // Update state with fetched transactions, or an empty array if null
      } catch (err: any) {
        console.error('Error fetching transactions:', err.message);
        setError(`Failed to load transactions: ${err.message}`);
        toast.error(`Failed to load transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.id, supabase]); // Dependencies: re-run if user.id or supabase client changes

  if (loading && !transactions.length) { // Show loading only if no transactions are loaded yet
    return <div className="text-center p-6">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="p-4 border border-gray-200 rounded-md shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ${transaction.amount.toFixed(2)}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-700 text-sm">
                To/From Account: {transaction.receiver_account_number}
              </p>
              <p className="text-gray-500 text-xs">
                Date: {new Date(transaction.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
