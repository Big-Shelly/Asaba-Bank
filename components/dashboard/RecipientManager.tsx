// components/dashboard/RecipientManager.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState, useEffect } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

// Define the interface for a Recipient object, matching your Supabase table structure
interface Recipient {
  id: string;
  user_id: string;
  name: string;
  account_number: string;
  created_at: string; // Assuming a timestamp column
}

// Define the props for the RecipientManager component
interface RecipientManagerProps {
  userId: string; // The ID of the current user
}

export default function RecipientManager({ userId }: RecipientManagerProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // useEffect to fetch recipients when the component mounts or userId changes
  useEffect(() => {
    const fetchRecipients = async () => {
      if (!userId) {
        setError('User ID is missing. Cannot fetch recipients.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const { data, error: fetchError } = await supabase
          .from('recipients') // Query the 'recipients' table
          .select('*') // Select all columns
          .eq('user_id', userId) // Filter by the current user's ID
          .order('created_at', { ascending: false }); // Order by creation date, newest first

        if (fetchError) {
          throw fetchError;
        }

        setRecipients(data || []); // Update state with fetched recipients, or an empty array if null
      } catch (err: any) {
        console.error('Error fetching recipients:', err.message);
        setError(`Failed to load recipients: ${err.message}`);
        toast.error(`Failed to load recipients: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, [userId, supabase]); // Dependencies: re-run if userId or supabase client changes

  // Function to handle deleting a recipient
  const handleDeleteRecipient = async (recipientId: string) => {
    if (!confirm('Are you sure you want to delete this recipient?')) {
      return; // User cancelled the deletion
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('recipients')
        .delete()
        .eq('id', recipientId)
        .eq('user_id', userId); // Ensure only the owner can delete

      if (deleteError) {
        throw deleteError;
      }

      // Optimistically update the UI by removing the deleted recipient
      setRecipients(prevRecipients => prevRecipients.filter(r => r.id !== recipientId));
      toast.success('Recipient deleted successfully!');
    } catch (err: any) {
      console.error('Error deleting recipient:', err.message);
      setError(`Failed to delete recipient: ${err.message}`);
      toast.error(`Failed to delete recipient: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading recipients...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Recipients</h2>

      {recipients.length === 0 ? (
        <p className="text-gray-600">No recipients added yet. Add a new recipient above!</p>
      ) : (
        <ul className="space-y-4">
          {recipients.map((recipient) => (
            <li key={recipient.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm">
              <div>
                <p className="font-semibold text-lg">{recipient.name}</p>
                <p className="text-gray-600 text-sm">Account: {recipient.account_number}</p>
              </div>
              <button
                onClick={() => handleDeleteRecipient(recipient.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
