import { useState, useEffect, useCallback } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAuth } from '@/hooks/useAuth';

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  created_at: string;
  email: string;
}

const COMMON_SUPPORT_TOPICS = [
  {
    subject: 'How do I reset my password?',
    answer:
      'To reset your password, go to the login page and click "Forgot password?". You will receive an email with instructions.',
  },
  {
    subject: 'How to update my account details?',
    answer:
      'You can update your account details from the dashboard under the "Profile" section.',
  },
  {
    subject: 'When will my deposit clear?',
    answer:
      'Deposits usually clear within 2 business days. Checks clear daily and direct deposits come 2 days early.',
  },
  {
    subject: 'How do I generate statements?',
    answer:
      'You can generate account statements in the Support section by selecting the "Statements" option and entering your email.',
  },
];

export default function Tickets() {
  const supabase = useSupabaseClient();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading } = useAuth();

  // New ticket form state
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Common topics toggle state
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const fetchTickets = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const now = new Date();
      for (const ticket of data) {
        const createdTime = new Date(ticket.created_at);
        const diffInHours = (now.getTime() - createdTime.getTime()) / (1000 * 60 * 60);
        if (ticket.status === 'open' && diffInHours > 48) {
          await supabase.from('tickets').update({ status: 'closed' }).eq('id', ticket.id);
          ticket.status = 'closed';
          // Email auto-response should be handled backend or separate process
        }
      }
      setTickets(data);
    } else {
      setTickets([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchTickets();

    const ticketsChannel = supabase
      .channel('public:tickets')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tickets', filter: `user_id=eq.${user.id}` },
        () => {
          fetchTickets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ticketsChannel);
    };
  }, [user, fetchTickets]);

  if (!user) return null;
  if (loading) return <p>Loading tickets...</p>;

  function toggleTopic(subject: string) {
    setExpandedTopics((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    setSubmitting(true);

    const { error } = await supabase.from('tickets').insert([
      {
        user_id: user.id,
        email: user.email,
        subject: newSubject.trim(),
        message: newMessage.trim(),
        status: 'open',
      },
    ]);

    if (error) {
      alert('Failed to submit ticket: ' + error.message);
    } else {
      setNewSubject('');
      setNewMessage('');
    }

    setSubmitting(false);
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-800">Your Support Tickets</h2>

      {/* Common support topics */}
      <section className="mb-8 bg-white shadow rounded p-4 border border-gray-300">
        <h3 className="text-xl font-semibold mb-4">Common Support Topics</h3>
        {COMMON_SUPPORT_TOPICS.map(({ subject, answer }) => {
          const isExpanded = expandedTopics.includes(subject);
          return (
            <div key={subject} className="mb-3 border-b border-gray-200 pb-2">
              <button
                onClick={() => toggleTopic(subject)}
                className="w-full text-left font-medium text-indigo-700 hover:text-indigo-900 focus:outline-none flex justify-between items-center"
                aria-expanded={isExpanded}
              >
                {subject}
                <span className="ml-2">{isExpanded ? '▲' : '▼'}</span>
              </button>
              {isExpanded && (
                <p className="mt-2 text-gray-700 whitespace-pre-line">{answer}</p>
              )}
            </div>
          );
        })}
      </section>

      {/* Existing tickets */}
      {tickets.length === 0 ? (
        <p className="text-gray-500">You have no support tickets.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white shadow rounded p-4 border border-gray-200"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">{ticket.subject}</h3>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  ticket.status === 'open'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {ticket.status.toUpperCase()}
              </span>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{ticket.message}</p>
            <p className="mt-2 text-sm text-gray-500">
              Submitted on {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}

      {/* New Ticket Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 border border-gray-300 mt-8"
      >
        <h3 className="text-xl font-semibold mb-4">Submit a New Ticket</h3>

        <label className="block mb-2 font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={user?.user_metadata?.full_name ?? user?.email ?? ''}
          readOnly
          className="w-full border border-gray-300 rounded p-2 mb-4 bg-gray-100 cursor-not-allowed"
        />

        <label className="block mb-2 font-medium" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter ticket subject"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          required
          disabled={submitting}
          list="common-subjects"
        />
        <datalist id="common-subjects">
          {COMMON_SUPPORT_TOPICS.map(({ subject }) => (
            <option key={subject} value={subject} />
          ))}
        </datalist>

        <label className="block mb-2 font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Describe your issue in detail"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          required
          disabled={submitting}
        ></textarea>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
}
