import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Admin() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const session = await supabase.auth.getSession();
      const email = session.data.session?.user.email;
      if (!email || email !== 'admin@example.com') return router.push('/');

      const { data } = await supabase.from('accounts').select('*');
      setAccounts(data ?? []);
    };
    load();
  }, [router]);

  const approve = async (id: string) => {
    await supabase.from('accounts').update({ status: 'active' }).eq('id', id);
    const { data } = await supabase.from('accounts').select('*');
    setAccounts(data ?? []);
  };

  return (
    <Layout title="Admin Panel">
      <h1 className="text-2xl font-bold mb-6">Pending Accounts</h1>
      <ul className="space-y-4">
        {accounts
          .filter((a) => a.status !== 'active')
          .map((a) => (
            <li key={a.id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-indigo-800">{a.email}</p>
                <p className="text-sm text-gray-500">Status: {a.status}</p>
              </div>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => approve(a.id)}
              >
                Approve
              </button>
            </li>
          ))}
      </ul>
    </Layout>
  );
}
