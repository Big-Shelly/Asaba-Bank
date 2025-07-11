// pages/_app.tsx
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'; // correct package
import { SessionContextProvider } from '@supabase/auth-helpers-react';     // correct package
import type { Session } from '@supabase/supabase-js';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session | null }>) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient()
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
