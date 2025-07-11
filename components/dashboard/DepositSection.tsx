// components/dashboard/DepositSection.tsx

// 1. Adjust Imports:
import { useState, useEffect } from 'react';
import { createServerComponentClient } from '@supabase/ssr'; // Import the correct server component client
import { cookies } from 'next/headers'; // Import cookies utility for server components
import { useAuth } from '@/hooks/useAuth'; // Keep existing imports
import DepositModal from './DepositModal'; // Keep existing imports

// 2. Modify Component Definition to be async
export default async function DepositSection() { // Add 'async' keyword
  // 3. Update Supabase Client Initialization
  const cookieStore = cookies(); // Get the cookie store instance
  const supabase = createServerComponentClient({ cookies: cookieStore }); // Initialize Supabase client for server component

  // Rest of your component logic will go here
  // Ensure that any data fetching with 'supabase' within this component is also awaited.
  // For example:
  // const { data: profile } = await supabase.from('profiles').select('*').single();

  // You will likely have existing state and effects.
  // If this component was meant to be a client component (with 'use client'),
  // you might need to refactor parts that rely on 'useState'/'useEffect'
  // into a separate client component or pass props from this server component.
  // However, based on the 'cookies' error, it strongly suggests a server component context.

  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const { user } = useAuth(); // Assuming useAuth is compatible with server/client context or provides initial data

  // If useEffect depends on client-side behavior, this component MUST be a 'use client' component.
  // If that's the case, you would use 'createBrowserClient' instead and move 'cookies()' logic.
  // For now, I'm assuming server component based on the error.
  useEffect(() => {
    // This useEffect will only run if this is a client component.
    // If it's a server component, you would fetch balance directly.
    const fetchBalance = async () => {
      if (user?.id) {
        // This is a client-side fetch, which would typically use createBrowserClient.
        // If this component is truly a server component, this useEffect won't run.
        // You'd fetch balance like: const { data: balanceData } = await supabase.from('balances').select('amount').eq('user_id', user.id).single();
        // The error implies you are in a server context trying to initialize the client this way.
      }
    };
    fetchBalance();
  }, [user]);

  // ... rest of your component logic
  return (
    <div>
      {/* Your existing JSX */}
      <DepositModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeposit={() => {}} // Your deposit logic here
      />
    </div>
  );
}
