import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users || []);
  };

  const createUser = async () => {
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMsg(data.message);
    fetchUsers();
    setEmail('');
    setPassword('');
  };

  const deleteUser = async (id: string) => {
    await fetch('/api/admin/delete-user', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title="Admin Panel">
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Admin – Manage Users</h1>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Create User</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />
          <button
            onClick={createUser}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create
          </button>
          {msg && <p className="mt-2 text-green-600">{msg}</p>}
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul className="space-y-2">
            {users.map((u: any) => (
              <li key={u.id} className="flex justify-between items-center border p-2 rounded">
                <span>{u.email}</span>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
