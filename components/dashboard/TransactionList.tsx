import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAuth } from '@/hooks/useAuth';
import Transactions from './Transactions';

export default function TransactionList() {
  const supabase = useSupabaseClient();
  const { user } = useAuth(); // ✅ Make sure user is always pulled from the hook
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('withdrawals_with_count') // ✅ Make sure this view exists
          .select(`
            id,
            amount,
            created_at,
            bank_name,
            routing_number,
            account_number,
            method,
            status,
            withdrawal_count
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Failed to fetch transactions:', error);
          setError('Failed to load transactions.');
          return;
        }

        console.log('Fetched transactions:', data);
        setTransactions(data || []);
      } catch (err) {
        setError('Unexpected error occurred while fetching transactions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, supabase]);

  if (!user) return <p className="p-4">Please log in to see your transactions.</p>;
  if (loading) return <p className="p-4">Loading transactions...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return <Transactions transactions={transactions} />;
}
