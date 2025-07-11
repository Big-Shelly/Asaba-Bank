// components/dashboard/Navbar.tsx
'use client'; // Mark this as a client component as it uses hooks and client-side Supabase client.

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js App Router
import { createBrowserClient } from '@supabase/ssr'; // Use createBrowserClient for client-side Supabase
import { useState, useEffect } from 'react';

// Define the props interface for the Navbar component
interface NavbarProps {
  // Add any props your Navbar might receive, e-g., user status, links
}

export default function Navbar({}: NavbarProps) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Initialize the Supabase client for client-side use
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // useEffect to get the user's session and email when the component mounts
  // or when the auth state changes.
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Corrected: Use nullish coalescing operator (??) to convert undefined to null
        setUserEmail(user.email ?? null);
      } else {
        setUserEmail(null);
      }
    };

    getUser();

    // Listen for auth state changes to update the user's email dynamically
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Corrected: Use nullish coalescing operator (??) to convert undefined to null
        setUserEmail(session.user.email ?? null);
      } else {
        setUserEmail(null);
      }
    });

    // Clean up the auth listener when the component unmounts
    return () => {
      // Corrected: Access 'unsubscribe' method via the 'subscription' property
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]); // Re-run if supabase client instance changes (though it's constant here)

  // Function to handle user logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      // Replace alert() with a custom message box for better UX in production
      alert('Logout failed.');
    } else {
      setUserEmail(null); // Clear user email on successful logout
      router.push('/login'); // Redirect to login page after logout
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Home Link */}
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Asaba Bank
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/transactions" className="hover:text-blue-400 transition-colors">
            Transactions
          </Link>
          <Link href="/profile" className="hover:text-blue-400 transition-colors">
            Profile
          </Link>

          {/* User Status and Auth Actions */}
          {userEmail ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Welcome, {userEmail}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-md transition-colors">
                Login
              </Link>
              <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-md transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
