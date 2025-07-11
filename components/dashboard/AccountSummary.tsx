import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

interface Props {
  userId: string;
}

const AccountSummary: React.FC<Props> = ({ userId }) => {
  const checkingRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);
  const [showCheckingModal, setShowCheckingModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);

  const handleCheckingHover = useCallback(() => {
    setShowCheckingModal(true);
    const timer = setTimeout(() => {
      setShowCheckingModal(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSavingsHover = useCallback(() => {
    setShowSavingsModal(true);
    const timer = setTimeout(() => {
      setShowSavingsModal(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { user } = useAuth();

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [accountName, setAccountName] = useState('');
  const [checkingBalance, setCheckingBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('checking_balance, savings_balance')
        .eq('id', userId)
        .single();

      if (data) {
        setCheckingBalance(data.checking_balance || 0);
        setSavingsBalance(data.savings_balance || 0);
      }
    };

    fetchBalances();
  }, [userId, supabase]);

  useEffect(() => {
    const fetchAccountName = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (data?.full_name) setAccountName(data.full_name);
    };

    fetchAccountName();
  }, [user, supabase]);

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 col-span-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
          <h2 className="text-lg font-semibold text-gray-600 mb-1">Account Holder</h2>
          <p className="text-2xl font-bold text-gray-800">{accountName || 'Loading...'}</p>
        </div>

        <div
          ref={checkingRef}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          onMouseEnter={handleCheckingHover}
          onMouseLeave={() => setShowCheckingModal(false)}
        >
          <div className="flex items-center gap-2">
            <span className="text-green-500">🌱</span>
            <h3 className="text-xl font-bold text-gray-700 group-hover:text-green-600 transition-colors duration-200">Life Green Checking</h3>
          </div>
          <p className="text-xl font-semibold text-green-600 mt-2">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(checkingBalance)}
          </p>
        </div>

        <div
          ref={savingsRef}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          onMouseEnter={handleSavingsHover}
          onMouseLeave={() => setShowSavingsModal(false)}
        >
          <div className="flex items-center gap-2">
            <span className="text-blue-500">🌳</span>
            <h3 className="text-xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">BigTree Savings</h3>
          </div>
          <p className="text-xl font-semibold text-blue-600 mt-2">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(savingsBalance)}
          </p>
        </div>

        {/* Modals */}
        {showCheckingModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Life Green Checking</h3>
              <p className="text-sm text-gray-600 mb-3">High-yield checking account with no monthly fees</p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                <li>Free unlimited transactions</li>
                <li>No minimum balance requirement</li>
                <li>Instant mobile deposits</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        )}

        {showSavingsModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">BigTree Savings</h3>
              <p className="text-sm text-gray-600 mb-3">High-interest savings account with competitive rates</p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                <li>FDIC insured up to $250,000</li>
                <li>No minimum balance requirement</li>
                <li>Monthly interest payments</li>
                <li>Easy transfers to checking</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSummary;
