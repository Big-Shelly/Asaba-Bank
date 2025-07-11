// components/dashboard/TransactionList.tsx
'use client'; // This directive marks the component as a Client Component.

import React, { useEffect, useState } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
// Assuming 'Transactions' component is designed to display a list of transactions
// If you have a separate 'Transactions' component, ensure its types are consistent.
// For this fix, we are assuming TransactionList itself displays the list.
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

// Define the interface for a Transaction object, matching your Supabase table structure
// This interface should be consistent across all components that handle Transaction data.
interface Transaction {
  id: string;
  sender_user_id: string;
  receiver_account_number: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed'; // Example statuses
  created_at: string;
  type: 'deposit' | 'withdrawal' | 'transfer'; // Example transaction types
  bank_name: string;
  routing_number: string;
  method: string;
  account_number: string; // This was added in previous fixes to match expected props
}

// Define the props for the TransactionList component
// Crucial fix: Add the 'transactions' prop here.
interface TransactionListProps {
  transactions: Transaction[]; // Expects an array of Transaction objects
}

export default function TransactionList({ transactions }: TransactionListProps) {
  // Removed internal state for transactions, loading, error, and Supabase client
  // as this component now receives 'transactions' directly as a prop.
  // If this component needs to fetch its own data, that logic would remain.
  // For now, it acts as a display component for the passed transactions.

  // The useAuth hook and Supabase client are not directly needed here
  // if this component's sole purpose is to display the 'transactions' prop.
  // If you need them for other functionalities (e.g., filtering, pagination),
  // you would re-add them.
  // const { user } = useAuth();
  // const supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  // The fetchData useEffect is no longer needed here if transactions are passed as props.
  // useEffect(() => {
  //   const fetchTransactions = async () => { /* ... */ };
  //   fetchTransactions();
  // }, [user?.id, supabase]);

  // Simplified rendering based on transactions prop
  if (transactions.length === 0) {
    return <p className="text-gray-600">No transactions found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Assuming the title is handled by the parent component, or can be added here */}
      {/* <h2 className="text-2xl font-bold mb-4">All Transactions</h2> */}

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
            {/* Display other transaction details if available and relevant */}
            {transaction.bank_name && <p className="text-gray-700 text-sm">Bank: {transaction.bank_name}</p>}
            {transaction.routing_number && <p className="text-gray-700 text-sm">Routing: {transaction.routing_number}</p>}
            {transaction.method && <p className="text-gray-700 text-sm">Method: {transaction.method}</p>}
            <p className="text-gray-500 text-xs">
              Date: {new Date(transaction.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
