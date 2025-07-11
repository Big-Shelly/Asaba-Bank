// components/Navbar.tsx
'use client'; // This directive marks the component as a Client Component.

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js App Router
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is your custom auth hook
import { createBrowserClient } from '@supabase/ssr'; // For logout functionality if needed directly here
import toast from 'react-hot-toast'; // Assuming react-hot-toast for notifications

// Define the props interface for the Navbar component
interface NavbarProps {
  // Added 'showHome' prop as a boolean, which is expected by pages/dashboard/support.tsx
  showHome?: boolean; // Make it optional if not all pages will pass it
}

export default function Navbar({ showHome }: NavbarProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Initialize Supabase client for logout functionality
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success('Logged out successfully!');
      router.push('/login'); // Redirect to login page after logout
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          Asaba Bank
        </Link>

        <div className="flex items-center space-x-6">
          {showHome && ( // Conditionally render Home link based on prop
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
          )}

          {authLoading ? (
            <span className="text-gray-300">Loading...</span>
          ) : user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className="hover:text-blue-200 transition-colors">
                Profile
              </Link>
              <Link href="/dashboard/transactions" className="hover:text-blue-200 transition-colors">
                Transactions
              </Link>
              <Link href="/dashboard/support" className="hover:text-blue-200 transition-colors">
                Support
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200 transition-colors">
                Login
              </Link>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-md">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
