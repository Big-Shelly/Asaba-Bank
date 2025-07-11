// hooks/useAuth.ts
'use client'; // This directive marks the hook as a client-side hook.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js App Router
// Import createBrowserClient for client-side Supabase interactions.
// This is the correct way to initialize the Supabase client in client components
// for Next.js App Router.
import { createBrowserClient } from '@supabase/ssr';

// Define the User interface for TypeScript, matching Supabase's user structure
interface User {
  id: string;
  email: string | null; // email can be null or undefined, so explicitly allow null
  // Add other user properties you might use, e.g., user_metadata, app_metadata
}

// Define the return type of the useAuth hook
interface AuthHookResult {
  user: User | null;
  loading: boolean;
  error: string | null;
  // You might add other functions here, e.g., signIn, signOut, signUp
}

export function useAuth(): AuthHookResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter for redirection

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUserSession = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: { user: supabaseUser }, error: sessionError } = await supabase.auth.getUser();

        if (sessionError) {
          throw sessionError;
        }

        if (supabaseUser) {
          // Map Supabase user to your User interface, handling potential undefined email
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email ?? null,
            // Map other properties if needed
          });
        } else {
          setUser(null);
        }
      } catch (err: any) {
        console.error('Error fetching user session:', err.message);
        setError(`Authentication error: ${err.message}`);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Call it once on mount
    getUserSession();

    // Set up a real-time listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? null,
        });
      } else {
        setUser(null);
        // Optionally redirect to login if session ends
        // router.push('/login');
      }
      setLoading(false); // Ensure loading is false after any auth state change
    });

    // Clean up the subscription on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]); // Dependency array includes supabase to ensure it's stable

  return { user, loading, error };
}
