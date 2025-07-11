// pages/admin.tsx
'use client'; // This directive marks the page as a Client Component.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js App Router
import Layout from '@/components/Layout'; // Assuming your Layout component exists
// Import createBrowserClient for client-side Supabase interactions.
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is your custom auth hook
import toast from 'react-hot-toast'; // Assuming react-hot-toast for notifications

// Define interfaces for data you might fetch (adjust based on your Supabase schema)
interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user'; // Example: user roles
  // Add other profile properties as needed
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading state from useAuth hook
  const [adminData, setAdminData] = useState<any[]>([]); // State to hold admin-specific data
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Effect to check user authentication and authorization
  useEffect(() => {
    if (!authLoading) { // Only run after auth state is determined
      if (!user) {
        // If no user, redirect to login
        toast.error('You must be logged in to access the admin page.');
        router.push('/login');
      } else {
        // Optional: Check user role if you have a roles system in your database
        // For example, fetch user profile and check role
        const checkAdminRole = async () => {
          const { data: profile, error: profileError } = await supabase
            .from('profiles') // Assuming a 'profiles' table with user roles
            .select('role')
            .eq('id', user.id)
            .single();

          if (profileError || profile?.role !== 'admin') {
            toast.error('You do not have permission to access this page.');
            router.push('/dashboard'); // Redirect if not an admin
          } else {
            // User is an admin, proceed to fetch admin data
            fetchAdminData();
          }
        };
        checkAdminRole();
      }
    }
  }, [user, authLoading, router, supabase]); // Dependencies for this effect

  // Function to fetch admin-specific data (e.g., all users, transactions)
  const fetchAdminData = async () => {
    setLoadingData(true);
    setError(null);
    try {
      // Example: Fetch all users or specific admin-level data
      const { data, error: fetchDataError } = await supabase
        .from('users') // Example: a 'users' table or 'profiles' table
        .select('*'); // Select all data for admin view

      if (fetchDataError) {
        throw fetchDataError;
      }
      setAdminData(data || []);
    } catch (err: any) {
      console.error('Error fetching admin data:', err.message);
      setError(`Failed to load admin data: ${err.message}`);
      toast.error(`Failed to load admin data: ${err.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  if (authLoading || loadingData) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-700">Loading admin page...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-red-600">
          <p className="text-lg">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  // If user is not an admin (after checks), the useEffect will redirect,
  // so this part only renders if the user is confirmed to be an admin.
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">All Users/Data</h2>
          {adminData.length === 0 ? (
            <p className="text-gray-600">No data available for admin view.</p>
          ) : (
            <ul className="space-y-4">
              {adminData.map((item: any) => ( // Adjust 'any' to specific interface if available
                <li key={item.id} className="p-4 border rounded-md bg-gray-50">
                  <pre>{JSON.stringify(item, null, 2)}</pre> {/* Display raw data for admin */}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add more admin-specific components or sections here */}
      </div>
    </Layout>
  );
}
