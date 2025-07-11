import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/ssr';

// Define the User interface for TypeScript
interface User {
  id: string; // Supabase user IDs are typically UUID strings
  email?: string; // Optional, as email might not always be present
}

// Define the return type of useAuth
interface AuthContext {
  user: User | null;
  isLoading: boolean;
}

export function useAuth(): AuthContext {
  // Initialize Supabase client (client-side)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: () => undefined, // Adjust if you use cookies for SSR
        set: () => undefined,
        remove: () => undefined,
      },
    }
  );
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        router.push('/auth/login');
        setIsLoading(false);
        return;
      }

      setUser(session.user as User); // Type assertion to match User interface
      setIsLoading(false);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (!session) {
        router.push('/auth/login');
        setUser(null);
      } else {
        setUser(session.user as User); // Type assertion to match User interface
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return { user, isLoading };
}
