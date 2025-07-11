// pages/dashboard/Tickets.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';


interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  created_at: string;
  email: string;
  attachment_url?: string;
}

export default function Tickets() {
  const user = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('ticket-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () => {
        fetchTickets();
      })
      .subscribe();

    fetchTickets();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const updatedTickets = await Promise.all(
        data.map(async (ticket: Ticket) => {
          const createdTime = new Date(ticket.created_at);
          const now = new Date();
          const diffInHours = (now.getTime() - createdTime.getTime()) / (1000 * 60 * 60);

          if (ticket.status === 'open' && diffInHours > 48) {
            await supabase
              .from('tickets')
              .update({ status: 'closed' })
              .eq('id', ticket.id);

            await sendEmail({
              to: ticket.email,
              subject: `Ticket #${ticket.id} Closed`,
              text: `Hello,

Your support ticket titled "${ticket.subject}" has been automatically closed after 48 hours. Please submit a new ticket if the issue persists.

- Support Team`
            });

            return { ...ticket, status: 'closed' };
          }

          return ticket;
        })
      );

      setTickets(updatedTickets);
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!subject || !message) return;
    let attachment_url = '';

    if (attachment) {
      const { data, error } = await supabase.storage
        .from('attachments')
        .upload(`tickets/${Date.now()}_${attachment.name}`, attachment);

      if (!error && data) {
        const { data: publicUrl } = supabase.storage
          .from('attachments')
          .getPublicUrl(data.path);
        attachment_url = publicUrl?.publicUrl || '';
      }
    }

    await supabase.from('tickets').insert({
      subject,
      message,
      email: user.email,
      user_id: user.id,
      attachment_url,
      status: 'open'
    });

    setSubject('');
    setMessage('');
    setAttachment(null);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  if (!user) return null;
  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-800">Your Support Tickets</h2>

      <div className="bg-white rounded p-4 shadow space-y-4">
        <h3 className="text-lg font-semibold">Open a New Ticket</h3>
        <input
          type="text"
          placeholder="Subject"
          className="w-full border px-3 py-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="w-full border px-3 py-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="file" onChange={(e) => setAttachment(e.target.files?.[0] || null)} />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Submit Ticket
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('open')}
          className={`px-3 py-1 rounded ${filter === 'open' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Open
        </button>
        <button
          onClick={() => setFilter('closed')}
          className={`px-3 py-1 rounded ${filter === 'closed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Closed
        </button>
      </div>

      {filteredTickets.length === 0 ? (
        <p className="text-gray-500">You have no {filter} tickets.</p>
      ) : (
        filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white shadow rounded p-4 border border-gray-200"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">{ticket.subject}</h3>
              <span className={`text-sm px-2 py-1 rounded ${
                ticket.status === 'open'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {ticket.status.toUpperCase()}
              </span>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{ticket.message}</p>
            {ticket.attachment_url && (
              <a
                href={ticket.attachment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-2 inline-block"
              >
                View Attachment
              </a>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Submitted on {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
