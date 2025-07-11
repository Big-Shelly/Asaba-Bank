// components/dashboard/TransactionList.tsx
'use client'; // This directive marks the component as a Client Component.

import React, { useEffect, useState } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
import Transactions from './Transactions'; // Assuming this component exists and displays transactions
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

// Define the interface for a Transaction object, matching your Supabase table structure
// Updated to include properties expected by the 'Transactions' component.
interface Transaction {
  id: string;
  sender_user_id: string;
  receiver_account_number: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed'; // Example statuses
  created_at: string;
  type: 'deposit' | 'withdrawal' | 'transfer'; // Example transaction types
  // Added properties based on the error message:
  bank_name?: string; // Assuming these might be optional or only present for certain types
  routing_number?: string;
  // account_number is already present, but ensure its type matches if it was different
  method?: string; // e.g., 'bank_transfer', 'card', 'cash'

  // Crucial fix: Add 'account_number' as a required property,
  // as the 'Transactions' component explicitly requires it.
  // This assumes that your database query will return a field named 'account_number'
  // or that 'receiver_account_number' should be mapped to 'account_number' before passing.
  // For simplicity, I'm adding it as a separate required field.
  account_number: string;
}

// Define the props for the TransactionList component
interface TransactionListProps {
  // If this component receives any props, define them here.
  // For example, if it needs a specific user ID passed from a parent:
  // userId: string;
}

export default function TransactionList({}: TransactionListProps) {
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

        // Before setting transactions, ensure each object has the 'account_number' property
        // This is a crucial step if your database column is 'receiver_account_number'
        // but the 'Transactions' component expects 'account_number'.
        const formattedTransactions = (data || []).map(t => ({
          ...t,
          account_number: t.receiver_account_number // Map receiver_account_number to account_number
        })) as Transaction[]; // Assert type after mapping

        setTransactions(formattedTransactions); // Update state with fetched transactions, or an empty array if null
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
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        // Assuming 'Transactions' component is designed to display a list of transactions
        <Transactions transactions={transactions} />
      )}
    </div>
  );
}
