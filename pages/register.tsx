import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const checkGeo = async () => {
    try {
      const res = await fetch('https://jykafoyljnhhemisxwse.functions.supabase.co/check-country');
      const data = await res.json();
      if (!data.allowed) {
        alert('Blocked: Only users in the United States may register.');
        return false;
      }
      return true;
    } catch {
      alert('Location check failed.');
      return false;
    }
  };

  const handleRegister = async () => {
    const geoOk = await checkGeo();
    if (!geoOk) return;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return setError(error.message);
    setMsg('Registered! Await admin approval. Check your email.');
  };

  return (
    <Layout title="Register">
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-soft-lg ring-1 ring-indigo-200">
          <h2 className="mb-6 text-3xl font-extrabold text-center text-primary">Create an Account</h2>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {msg && <p className="mb-3 text-sm text-green-600">{msg}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="w-full py-3 font-semibold text-white rounded-lg bg-primary hover:bg-primary-dark transition"
          >
            Register
          </button>
        </div>
      </div>
    </Layout>
  );
}
