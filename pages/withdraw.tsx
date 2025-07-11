import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import WithdrawalForm from '@/components/dashboard/WithdrawalForm';

// Define the User interface for TypeScript
interface User {
  id: string; // Supabase user IDs are typically UUID strings
  email?: string; // Optional, as email might not always be present
}

// Define the expected shape of the profile data from Supabase
interface Profile {
  withdrawal_count: number;
  checking_balance: number;
  savings_balance: number;
}

// Define the return type of useAuth for better type safety
interface AuthContext {
  user: User | null;
  isLoading: boolean;
}

export default function WithdrawPage() {
  // Destructure user and isLoading with typed useAuth
  const { user, isLoading } = useAuth() as AuthContext;

  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [balances, setBalances] = useState<{ Checking: number; Savings: number }>({
    Checking: 0,
    Savings: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch profile balances and withdrawal count
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('withdrawal_count, checking_balance, savings_balance')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (!profile) throw new Error('Profile data not found');

      // Type assertion to ensure profile matches Profile interface
      const typedProfile = profile as Profile;

      setWithdrawals(typedProfile.withdrawal_count || 0);
      setBalances({
        Checking: typedProfile.checking_balance || 0,
        Savings: typedProfile.savings_balance || 0,
      });
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching withdrawal data:', err);
      setError('Failed to load account information');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [user]);

  if (isLoading || loading) return <p className="p-6">Loading withdrawal options...</p>;
  if (!user) return <p className="p-6">You must be logged in to withdraw funds.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-800 mb-6">Withdraw Funds</h1>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <WithdrawalForm
        userId={user.id}
        userEmail={user.email || ''} // Provide fallback for optional email
        withdrawalCount={withdrawals}
        checkingBalance={balances.Checking}
        savingsBalance={balances.Savings}
        onSuccess={() => {
          fetchData();
        }}
        onError={(message: string) => {
          setError(message);
        }}
      />
    </main>
  );
}
