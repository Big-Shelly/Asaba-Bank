// components/dashboard/TransactionHistory.tsx
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  created_at: string;
  account_type: 'Checking' | 'Savings';
  bank_name: string;
  status: string;
}

export default function TransactionHistory({ userId }: { userId: string }) {
  const supabase = useSupabaseClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load transactions:', error);
      } else {
        setTransactions(data || []);
      }
      setLoading(false);
    };

    if (userId) fetchTransactions();
  }, [userId]);

  if (loading) return <p>Loading transactions...</p>;

  if (transactions.length === 0) return <p>No transactions found.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <ul className="divide-y">
        {transactions.map((txn) => (
          <li key={txn.id} className="py-2 flex justify-between items-center">
            <div>
              <span className="capitalize">{txn.type}</span>
              <span className="block text-sm text-gray-500">
                {txn.account_type} → {txn.bank_name}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span>${txn.amount.toFixed(2)}</span>
              <span className="text-sm text-gray-500">{new Date(txn.created_at).toLocaleString()}</span>
              <span className={`text-xs ${
                txn.status === 'pending' ? 'text-yellow-500' : 
                txn.status === 'completed' ? 'text-green-500' : 
                'text-red-500'
              }`}>
                {txn.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
