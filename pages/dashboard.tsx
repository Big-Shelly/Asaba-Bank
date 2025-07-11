import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient';

// Helper function to get greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

import AccountSummary from '@/components/dashboard/AccountSummary';
import Support from '@/components/dashboard/Support';
import Tickets from '@/components/dashboard/Tickets';
import DepositSection from '@/components/dashboard/DepositSection';
import WithdrawSection from '@/components/dashboard/WithdrawSection';
import Logo from '@/components/Logo';
import TransactionList from '@/components/dashboard/TransactionList';
import Bio from '@/components/dashboard/Bio';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Account {
  type: 'Checking' | 'Savings';
  number: string;
  balance: number;
}

interface AccountBalances {
  checking: number;
  savings: number;
}

interface BioData {
  full_name: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
}

interface UserData {
  full_name: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  user_id: string;
}

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState('summary');
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accountBalances, setAccountBalances] = useState<AccountBalances>({
    checking: 0,
    savings: 0,
  });
  const [withdrawalLimit, setWithdrawalLimit] = useState(2);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, email, phone1, phone2, address')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserData({
          ...data,
          user_id: user.id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, supabase]);

  useEffect(() => {
    if (isLoading) return; // wait for auth

    if (!user) {
      router.push('/auth/login');
      return;
    }

    async function loadProfile() {
      setLoadingProfile(true);
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, email, phone1, phone2, address')
        .eq('id', user.id)
        .single();

      if (!profileError && profileData) {
        setBioData(profileData as BioData);
      }

      const { data: balanceData, error: balanceError } = await supabase
        .from('profiles')
        .select('checking_balance, savings_balance, withdrawal_count')
        .eq('id', user.id)
        .maybeSingle();

      if (!balanceError && balanceData) {
        console.log('Withdrawal count from database:', balanceData.withdrawal_count);

        setAccountBalances({
          checking: balanceData.checking_balance || 0,
          savings: balanceData.savings_balance || 0,
        });

        setWithdrawalLimit(2 - (balanceData.withdrawal_count || 0));
      }
      setLoadingProfile(false);
    }

    loadProfile();
  }, [user, isLoading, supabase, router]);

  if (isLoading || loadingProfile) {
    return <p className="text-center mt-10">Loading your dashboard...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  const accounts: Account[] = [
    { type: 'Checking', number: '1234-5678-9012', balance: accountBalances.checking },
    { type: 'Savings', number: '9876-5432-1098', balance: accountBalances.savings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white p-2.5 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <h1 className="text-base font-bold">
              {getGreeting()}, {userData?.full_name || user.email} 👋
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Logo />
          </div>
        </div>
      </header>

      <main className="p-3.5 space-y-5 flex-1 container mx-auto">
        <div className="bg-white rounded-lg shadow p-3.5 mb-3.5">
          <nav className="flex flex-wrap gap-1.5 mb-3.5">
            <button
              onClick={() => setTab('summary')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setTab('deposits')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'deposits' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setTab('withdrawals')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'withdrawals' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setTab('transactions')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'transactions' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setTab('support')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'support' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Support
            </button>
            <button
              onClick={() => setTab('profile')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setTab('tickets')}
              className={`px-2.5 py-1.25 rounded ${
                tab === 'tickets' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Tickets
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-2">
          {tab === 'summary' && user && <AccountSummary userId={user.id} />}

          {tab === 'deposits' && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Deposits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DepositSection
                  accountType="Checking"
                  userId={userData?.user_id || ''}
                  isAuthenticated={!!user}
                />
                <DepositSection
                  accountType="Savings"
                  userId={userData?.user_id || ''}
                  isAuthenticated={!!user}
                />
              </div>
            </div>
          )}

          {tab === 'withdrawals' && user && (
            <WithdrawSection
              accountType="Checking"
              balance={accountBalances.checking}
              withdrawalLimit={withdrawalLimit}
              userId={user.id}
            />
          )}

          {tab === 'transactions' && <TransactionList />}
          {tab === 'support' && <Support />}
          {tab === 'profile' && bioData && (
            <Bio
              name={bioData.full_name}
              email={bioData.email}
              phone1={bioData.phone1}
              phone2={bioData.phone2}
              address={bioData.address}
              userId={user.id}
            />
          )}
          {tab === 'tickets' && <Tickets />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
