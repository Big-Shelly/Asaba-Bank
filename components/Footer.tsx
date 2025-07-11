// components/Footer.tsx
'use client'; // This directive marks the component as a Client Component.

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js App Router
import { useAuth } from '@/hooks/useAuth'; // Import your custom useAuth hook

export default function Footer() {
  const router = useRouter();
  // Corrected: Destructure 'loading' instead of 'isLoading' as per useAuth hook's return type.
  // Removed 'as AuthContext' as it was causing the type mismatch.
  const { user, loading } = useAuth();

  // The Supabase client initialization below is redundant if useAuth already handles it
  // and if the Footer doesn't need a separate client instance for other operations.
  // If you need a Supabase client directly in Footer for non-auth related tasks,
  // you would initialize it here using createBrowserClient similar to other components.
  // For now, assuming it's not needed and removing it.
  // const [supabase] = useState(() =>
  //   createBrowserClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  //   )
  // );

  // You can use 'loading' to conditionally render parts of the footer if needed
  // For example, showing a loading spinner for auth status.

  return (
    <footer className="bg-gray-800 text-white p-6 mt-12 shadow-inner">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Asaba Bank</h3>
          <p className="text-gray-400 text-sm">
            Your trusted partner for secure and efficient banking. We are committed to providing you
            with the best financial services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="text-gray-400 hover:text-blue-300 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/transactions" className="text-gray-400 hover:text-blue-300 transition-colors">
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-gray-400 hover:text-blue-300 transition-colors">
                Profile
              </Link>
            </li>
            {/* Conditionally render Login/Register or Logout based on user status */}
            {!user && !loading && ( // Show these if no user and not loading
              <>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-blue-300 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-blue-300 transition-colors">
                    Register
                  </Link>
                </li>
              </>
            )}
            {/* If you had a logout function here, it would be triggered by a button */}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Contact Us</h3>
          <p className="text-gray-400 text-sm">
            123 Bank Street, Financial District, Asaba, Nigeria
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Email: support@asababank.com
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Phone: +234 800 123 4567
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Asaba Bank. All rights reserved.
      </div>
    </footer>
  );
}
