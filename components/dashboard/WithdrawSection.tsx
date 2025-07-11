import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAuth } from '@/hooks/useAuth';
import WithdrawalForm from './WithdrawalForm';
import NewRecipientForm from './NewRecipientForm';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  accountType: string;
  balance: number;
  withdrawalLimit: number;
  userId: string;
}

export default function WithdrawSection({
  accountType,
  balance,
  withdrawalLimit,
  userId,
}: Props) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [withdrawalCount, setWithdrawalCount] = useState(0);
  const [checkingBalance, setCheckingBalance] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryDetails, setSummaryDetails] = useState<any>(null);
  const [showAddRecipient, setShowAddRecipient] = useState(false);

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
  }, [user, supabase]);

  if (!user || loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Withdraw Funds</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowAddRecipient(!showAddRecipient)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showAddRecipient ? 'Hide Add Recipient' : 'Add New Recipient'}
        </button>
      </div>

      {showAddRecipient && (
        <NewRecipientForm
          userId={user.id}
          onSuccess={() => {
            setShowAddRecipient(false);
            // Safely find withdrawal form and recipient manager and trigger click
            const withdrawalForm = document.querySelector('form.withdrawal-form');
            if (withdrawalForm) {
              const recipientManager = withdrawalForm.querySelector<HTMLElement>('div.recipient-manager');
              if (recipientManager) {
                recipientManager.click();
              }
            }
          }}
        />
      )}

      <WithdrawalForm
        userId={user.id}
        userEmail={user.email || ''}
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
          <p className="text-sm text-gray-600 mt-4">
            Funds are processing and should appear in the destination account within 1–2 business days.
          </p>
        </div>
      )}
    </div>
  );
}
