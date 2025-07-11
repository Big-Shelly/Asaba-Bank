// components/dashboard/NewRecipientForm.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
import { createBrowserClient } from '@supabase/ssr';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

interface NewRecipientFormProps {
  userId: string;
  onSuccess: () => void;
}

export default function NewRecipientForm({ userId, onSuccess }: NewRecipientFormProps) {
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!recipientName || !recipientAccountNumber) {
      toast.error('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('recipients') // Assuming you have a 'recipients' table
        .insert({
          user_id: userId,
          name: recipientName,
          account_number: recipientAccountNumber,
        })
        .select(); // Select the newly inserted row to confirm

      if (error) {
        throw error;
      }

      toast.success('Recipient added successfully!');
      setRecipientName('');
      setRecipientAccountNumber('');
      onSuccess(); // Call the onSuccess callback from parent component
    } catch (error: any) {
      console.error('Error adding recipient:', error.message);
      toast.error(`Failed to add recipient: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Recipient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="recipientName" className="block text-gray-700 text-sm font-bold mb-2">
            Recipient Name
          </label>
          <input
            type="text"
            id="recipientName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="recipientAccountNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Account Number
          </label>
          <input
            type="text"
            id="recipientAccountNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAccountNumber(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Recipient'}
        </button>
      </form>
    </div>
  );
}
