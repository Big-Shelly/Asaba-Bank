// components/dashboard/DepositSection.tsx
'use client'; // This directive is crucial. It tells Next.js that this component
              // runs on the client-side, allowing the use of React hooks like
              // useState and useEffect, and browser-specific Supabase clients.

import { useState, useEffect } from 'react';
// Correct import for client-side Supabase client initialization.
// 'createBrowserClient' is used in client components to interact with Supabase
// and handles session management via browser cookies securely.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
import DepositModal from './DepositModal'; // Assuming DepositModal is a client-side component

// Initialize the Supabase client for client-side operations.
// 'createBrowserClient' automatically picks up NEXT_PUBLIC_SUPABASE_URL
// and NEXT_PUBLIC_SUPABASE_ANON_KEY from your environment variables.
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DepositSection() {
  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const { user } = useAuth(); // Retrieve user information from your authentication hook

  // useEffect to fetch user's balance when the component mounts or user changes.
  // This hook ensures that the balance is loaded when the component is rendered on the client.
  useEffect(() => {
    const fetchBalance = async () => {
      // Ensure a user ID is available before attempting to fetch balance.
      if (user?.id) {
        const { data, error } = await supabase
          .from('balances') // Assuming your balance data is stored in a 'balances' table
          .select('amount') // Select the 'amount' column
          .eq('user_id', user.id) // Filter the balance for the current user
          .single(); // Expect a single row for the user's balance

        if (error) {
          // Log any errors that occur during balance fetching.
          console.error('Error fetching balance:', error);
          setBalance(null); // Set balance to null to indicate an error or no balance found.
        } else if (data) {
          setBalance(data.amount); // Update the balance state with the fetched amount.
        }
      }
    };

    fetchBalance(); // Call the function to fetch the balance.
  }, [user]); // Dependency array: This effect will re-run if the 'user' object changes.

  // Function to handle the deposit process.
  // This function is called when the user confirms a deposit.
  const handleDeposit = async () => {
    // Basic validation for the deposit amount.
    if (amount <= 0) {
      // Use a custom message box or modal instead of alert() in production apps.
      alert('Please enter a positive amount to deposit.');
      return;
    }
    // Ensure the user is logged in before proceeding with the deposit.
    if (!user?.id) {
      alert('User not logged in.');
      return;
    }

    try {
      // --- IMPORTANT NOTE ON SECURITY FOR FINANCIAL TRANSACTIONS ---
      // For production-grade financial applications, it is strongly recommended
      // to handle sensitive operations like updating balances via secure server-side
      // functions (e.g., Supabase Functions, Next.js API Routes, or Server Actions).
      // This helps enforce security rules, prevent client-side tampering, and manage
      // database transactions atomically. The current client-side implementation
      // is simplified for demonstration purposes.

      // Fetch the current balance to calculate the new balance.
      const { data: currentBalanceData, error: fetchError } = await supabase
        .from('balances')
        .select('amount')
        .eq('user_id', user.id)
        .single();

      // Handle cases where no balance record exists for the user (PGRST116 is "No rows found").
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError; // Re-throw other types of errors.
      }

      // Calculate the new balance. If no existing balance, start from 0.
      const newBalance = (currentBalanceData?.amount || 0) + amount;

      // Upsert (insert or update) the new balance into the 'balances' table.
      // 'onConflict: 'user_id'' ensures that if a record with the user_id already exists,
      // it will be updated; otherwise, a new record will be inserted.
      const { error: updateError } = await supabase
        .from('balances')
        .upsert(
          { user_id: user.id, amount: newBalance },
          { onConflict: 'user_id' }
        );

      if (updateError) {
        throw updateError; // Throw error if the upsert operation fails.
      }

      setBalance(newBalance); // Update the local state to reflect the new balance.
      setAmount(0); // Reset the input field for the next deposit.
      setIsModalOpen(false); // Close the deposit modal after a successful deposit.
      alert('Deposit successful!'); // Inform the user of success.

    } catch (error: any) {
      // Catch and log any errors during the deposit process.
      console.error('Deposit error:', error.message);
      // Inform the user about the failure.
      alert(`Deposit failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Deposit Funds</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} // Update amount state, ensure it's a number
          min="0" // Prevent negative deposits
        />
      </div>
      <button
        onClick={() => setIsModalOpen(true)} // Open the deposit modal when this button is clicked
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Proceed to Deposit
      </button>

      {/* DepositModal component, controlled by isModalOpen state */}
      <DepositModal
        isOpen={isModalOpen} // Controls whether the modal is visible
        onClose={() => setIsModalOpen(false)} // Callback to close the modal from within the modal
        onDeposit={handleDeposit} // Pass the deposit function to the modal for execution
        amount={amount} // Pass the current input amount to the modal (e.g., for display/confirmation)
      />

      {/* Display the current balance if it has been fetched */}
      {balance !== null && (
        <p className="mt-4 text-lg">Current Balance: ${balance.toFixed(2)}</p>
      )}
    </div>
  );
}
