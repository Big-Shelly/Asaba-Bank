// components/dashboard/Tickets.tsx
'use client'; // This directive marks the component as a Client Component.

import { useState, useEffect, useCallback } from 'react';
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is a client-side hook
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

// Define the interface for a Ticket object, matching your Supabase table structure
interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed' | 'pending'; // Example statuses
  created_at: string;
  updated_at: string;
}

// Define the props for the Tickets component
interface TicketsProps {
  // If this component receives any props, define them here.
  // For example, if it needs a specific user ID passed from a parent:
  // userId: string;
}

export default function Tickets({}: TicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTicketSubject, setNewTicketSubject] = useState<string>('');
  const [newTicketDescription, setNewTicketDescription] = useState<string>('');
  const { user } = useAuth(); // Get user from your auth hook

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // useCallback to memoize the fetchTickets function
  const fetchTickets = useCallback(async () => {
    if (!user?.id) {
      setError('User not authenticated. Cannot fetch tickets.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('tickets') // Query the 'tickets' table
        .select('*') // Select all columns
        .eq('user_id', user.id) // Filter by the current user's ID
        .order('created_at', { ascending: false }); // Order by creation date, newest first

      if (fetchError) {
        throw fetchError;
      }

      setTickets(data || []); // Update state with fetched tickets, or an empty array if null
    } catch (err: any) {
      console.error('Error fetching tickets:', err.message);
      setError(`Failed to load tickets: ${err.message}`);
      toast.error(`Failed to load tickets: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [user?.id, supabase]); // Dependencies: re-run if user.id or supabase client changes

  // useEffect to call fetchTickets when the component mounts or dependencies change
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]); // Dependency: fetchTickets memoized function

  // Function to handle submitting a new ticket
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('You must be logged in to create a ticket.');
      return;
    }
    if (!newTicketSubject || !newTicketDescription) {
      toast.error('Please fill in both subject and description.');
      return;
    }

    setLoading(true); // Set loading state for the form submission
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('tickets')
        .insert({
          user_id: user.id,
          subject: newTicketSubject,
          description: newTicketDescription,
          status: 'open', // Default status for new tickets
        })
        .select() // Select the inserted row to get its data
        .single(); // Expect a single new ticket

      if (insertError) {
        throw insertError;
      }

      // Add the new ticket to the beginning of the list
      setTickets(prevTickets => [data, ...prevTickets]);
      setNewTicketSubject(''); // Clear form fields
      setNewTicketDescription('');
      toast.success('Ticket created successfully!');
    } catch (err: any) {
      console.error('Error creating ticket:', err.message);
      toast.error(`Failed to create ticket: ${err.message}`);
      setError(`Failed to create ticket: ${err.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (loading && !tickets.length) { // Show loading only if no tickets are loaded yet
    return <div className="text-center p-6">Loading tickets...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Your Support Tickets</h2>

      {/* New Ticket Form */}
      <form onSubmit={handleCreateTicket} className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-3">Create New Ticket</h3>
        <div className="mb-3">
          <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newTicketSubject}
            onChange={(e) => setNewTicketSubject(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
            required
            disabled={loading}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>

      {/* Display Tickets */}
      {tickets.length === 0 ? (
        <p className="text-gray-600">You have no support tickets yet.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="p-4 border border-gray-200 rounded-md shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">{ticket.subject}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                  ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-2">{ticket.description}</p>
              <p className="text-gray-500 text-xs">
                Created: {new Date(ticket.created_at).toLocaleString()}
              </p>
              {ticket.updated_at && ticket.created_at !== ticket.updated_at && (
                <p className="text-gray-500 text-xs">
                  Last Updated: {new Date(ticket.updated_at).toLocaleString()}
                </p>
              )}
              {/* You might add buttons here to view ticket details, close, etc. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
