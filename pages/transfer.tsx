import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function TransferPage() {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleTransfer = async () => {
    setError('');
    setSuccess('');

    if (!recipientEmail || !amount) {
      setError('Please enter recipient email and amount.');
      return;
    }

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Get current logged-in user
    const { data: sessionData, error: sessionError } = await supabase.auth.getUser();
    if (sessionError || !sessionData.user) {
      setError('You must be logged in.');
      return router.push('/login');
    }

    const sender = sessionData.user;

    // Find recipient by email
    const { data: recipient, error: recError } = await supabase
      .from('users')
      .select('id')
      .eq('email', recipientEmail)
      .single();

    if (recError || !recipient) {
      setError('Recipient not found.');
      return;
    }

    // Record sender's debit
    const { error: sendError } = await supabase.from('transactions').insert({
      user_id: sender.id,
      amount: amt,
      type: 'send',
      description: `Sent to ${recipientEmail}`,
    });

    if (sendError) {
      setError('Failed to send. Try again.');
      return;
    }

    // Record recipient's credit
    const { error: depositError } = await supabase.from('transactions').insert({
      user_id: recipient.id,
      amount: amt,
      type: 'deposit',
      description: `Received from ${sender.email}`,
    });

    if (depositError) {
      setError('Transfer incomplete. Recipient deposit failed.');
      return;
    }

    setSuccess(`Successfully sent $${amt.toFixed(2)} to ${recipientEmail}`);
    setRecipientEmail('');
    setAmount('');
  };

  return (
    <Layout title="Transfer Funds">
      <div className="max-w-md px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-indigo-700">Transfer Funds</h1>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mb-3 text-sm text-green-600">{success}</p>}

        <input
          type="email"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleTransfer}
          className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Send Money
        </button>
      </div>
    </Layout>
  );
}
