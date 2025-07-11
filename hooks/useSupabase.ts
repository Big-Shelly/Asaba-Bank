// hooks/useSupabase.ts
'use client'; // This directive marks the hook as a client-side hook.

import { createBrowserClient } from '@supabase/ssr'; // Correct import for client-side Supabase client

// This hook provides a Supabase client instance configured for client-side operations.
// It's useful for components that need direct Supabase interaction.
export function useSupabase() {
  // Initialize the Supabase client using environment variables.
  // createBrowserClient automatically handles session management via browser cookies.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase; // Return the initialized Supabase client
}
