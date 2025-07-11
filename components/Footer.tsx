import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth';

interface User {
  id: string;
  email?: string;
}

interface AuthContext {
  user: User | null;
  isLoading: boolean;
}

export default function Footer() {
  const router = useRouter();
  const { user, isLoading } = useAuth() as AuthContext;

  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => {
            if (typeof document !== 'undefined') {
              const value = `; ${document.cookie}`;
              const parts = value.split(`; ${name}=`);
              if (parts.length === 2) return parts.pop()?.split(';').shift();
            }
            return undefined;
          },
          set: (name: string, value: string, options: { [key: string]: any }) => {
            if (typeof document !== 'undefined') {
              document.cookie = `${name}=${value}; path=/; max-age=${options['max-age'] || 0}`;
            }
          },
          remove: (name: string) => {
            if (typeof document !== 'undefined') {
              document.cookie = `${name}=; path=/; max-age=0`;
            }
          },
        },
      }
    )
  );

  const [logoutMessage, setLogoutMessage] = useState('');
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (logoutMessage === 'Logging out...') {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      setLogoutTimer(timer);
    }
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [logoutMessage, router, logoutTimer]);

  const handleLogout = async () => {
    if (!user) return;
    try {
      setLogoutMessage('Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      setLogoutMessage('Logout failed');
    }
  };

  return (
    <footer className="bg-blue-700 text-white py-6 mt-12">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-center">© {new Date().getFullYear()} Asaba Bank. All rights reserved.</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : user ? (
          <button
            onClick={handleLogout}
            disabled={logoutMessage === 'Logging out...'}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {logoutMessage || 'Logout'}
          </button>
        ) : (
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Sign In
          </button>
        )}
      </div>
    </footer>
  );
}
