import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  showHome?: boolean;
}

export default function DashboardNavbar({ showHome = true }: NavbarProps) {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const currentTab = router.query.tab || '';

  return (
    <nav className="bg-indigo-800 text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">Asaba Bank</div>

      <div className="space-x-4 flex items-center">
        {showHome && (
          <Link
            href="/dashboard"
            className="bg-white text-indigo-800 px-3 py-1 rounded hover:bg-indigo-100"
          >
            Home
          </Link>
        )}

        <Link
          href="/dashboard?tab=bio"
          className={`px-3 py-1 rounded hover:bg-indigo-600 ${
            currentTab === 'bio' ? 'bg-indigo-600' : ''
          }`}
        >
          Bio
        </Link>

        <Link
          href="/dashboard?tab=support"
          className={`px-3 py-1 rounded hover:bg-indigo-600 ${
            currentTab === 'support' ? 'bg-indigo-600' : ''
          }`}
        >
          Support
        </Link>

        <Link
          href="/dashboard?tab=tickets"
          className={`px-3 py-1 rounded hover:bg-indigo-600 ${
            currentTab === 'tickets' ? 'bg-indigo-600' : ''
          }`}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}
