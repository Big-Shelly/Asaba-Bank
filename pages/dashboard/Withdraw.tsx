import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import WithdrawalForm from '@/components/dashboard/WithdrawalForm';
import toast, { Toaster } from 'react-hot-toast';

export default function Withdraw() {
  const user = useAuth();
  const [loading, setLoading] = useState(true);
  const [withdrawalCount, setWithdrawalCount] = useState(0);
  const [checkingBalance, setCheckingBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryDetails, setSummaryDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('withdrawal_count, checking_balance, savings_balance')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        toast.error('Failed to load withdrawal data');
        setLoading(false);
        return;
      }

      setWithdrawalCount(profile.withdrawal_count || 0);
      setCheckingBalance(profile.checking_balance || 0);
      setSavingsBalance(profile.savings_balance || 0);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (!user || loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Withdraw Funds</h1>
      <WithdrawalForm
        userId={user.id}
        withdrawalCount={withdrawalCount}
        checkingBalance={checkingBalance}
        savingsBalance={savingsBalance}
        onSuccess={(summary) => {
          toast.success('Withdrawal request submitted');
          setSummaryDetails(summary);
          setShowSummary(true);
        }}
        onError={(message) => toast.error(message)}
      />

      {showSummary && summaryDetails && (
        <div className="mt-8 p-6 bg-green-50 border border-green-300 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Transaction Summary</h2>
          <p><strong>Amount:</strong> ${summaryDetails.amount}</p>
          <p><strong>To Bank:</strong> {summaryDetails.bankName}</p>
          <p><strong>Routing Number:</strong> {summaryDetails.routingNumber}</p>
          <p><strong>Account Number:</strong> {summaryDetails.accountNumber}</p>
          <p><strong>Transfer Type:</strong> {summaryDetails.transferType}</p>
          <p className="text-sm text-gray-600 mt-4">Funds are processing and should appear in the destination account within 1-2 business days.</p>
        </div>
      )}
    </div>
  );
}
