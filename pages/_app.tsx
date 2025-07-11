// pages/_app.tsx
import { useState } from 'react';
import type { AppProps } from 'next/app';
// Correct imports for Supabase Auth Helpers in Next.js Pages Router
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import '@/styles/globals.css'; // Assuming your global styles import

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase client for every new request in the browser
  // This ensures that the client has the latest session information.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    // Wrap your entire application with SessionContextProvider
    // This makes the Supabase client and session available throughout your app
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
