import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface Recipient {
  id: string;
  name: string;
  bank_name: string;
  account_number: string;
  routing_number: string;
  swift_code?: string;
}

export default function RecipientManager({ userId, onChange }: {
  userId: string;
  onChange: (recipient: Recipient) => void;
}) {
  const supabase = useSupabaseClient();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipients = async () => {
    const { data, error } = await supabase
      .from('recipients')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching recipients:', error);
      return;
    }
    
    setRecipients(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipients();
  }, [userId, supabase]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = recipients.find(r => r.id === e.target.value);
    if (selected) onChange(selected);
  };

  if (loading) return <p className="text-gray-500">Loading recipients...</p>;

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Select Recipient</label>
      <select
        onChange={handleSelect}
        className="w-full p-2 border rounded"
        defaultValue=""
      >
        <option disabled value="">-- Select Recipient --</option>
        {recipients.map(r => (
          <option key={r.id} value={r.id}>
            {r.name} ({r.bank_name})
          </option>
        ))}
      </select>
    </div>
  );
}
