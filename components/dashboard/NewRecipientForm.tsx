import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

export default function NewRecipientForm({ userId, onSuccess }: {
  userId: string;
  onSuccess?: () => void;
}) {
  const supabase = useSupabaseClient();
  const [form, setForm] = useState({
    name: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    swiftCode: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { name, bankName, routingNumber, accountNumber } = form;
    if (!name || !bankName || !routingNumber || !accountNumber) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('recipients').insert([
      {
        user_id: userId,
        name: form.name,
        bank_name: form.bankName,
        routing_number: form.routingNumber,
        account_number: form.accountNumber,
        swift_code: form.swiftCode,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error('Failed to add recipient');
    } else {
      toast.success('Recipient added successfully');
      setForm({
        name: '',
        bankName: '',
        routingNumber: '',
        accountNumber: '',
        swiftCode: '',
      });
      onSuccess?.();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-indigo-800">Add New Recipient</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Recipient Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={form.bankName}
          onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Routing Number"
          value={form.routingNumber}
          onChange={(e) => setForm({ ...form, routingNumber: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Account Number"
          value={form.accountNumber}
          onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="SWIFT Code (Optional)"
          value={form.swiftCode}
          onChange={(e) => setForm({ ...form, swiftCode: e.target.value })}
          className="p-2 border rounded col-span-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 text-white font-semibold rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Saving...' : 'Add Recipient'}
      </button>
    </form>
  );
}
