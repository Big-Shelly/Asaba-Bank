// pages/dashboard/bio.tsx
'use client'; // This directive marks the page as a Client Component.

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth is your custom auth hook
// Import createBrowserClient for client-side Supabase interactions.
import { createBrowserClient } from '@supabase/ssr';
import Layout from '@/components/Layout'; // Assuming your Layout component exists
import toast from 'react-hot-toast'; // Assuming react-hot-toast for notifications

// Define interface for UserProfile (adjust based on your Supabase 'profiles' schema)
interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  // Add other profile fields as per your database schema
  bio?: string | null;
  contact_number?: string | null;
}

export default function BioPage() {
  // Correctly destructure user and loading from useAuth
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [updatingProfile, setUpdatingProfile] = useState<boolean>(false);

  // Initialize the Supabase client for client-side use.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Function to fetch user profile data
  const fetchProfile = async () => {
    if (!user?.id) {
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('profiles') // Assuming your user profiles are in a 'profiles' table
        .select('*') // Select all columns
        .eq('id', user.id) // Filter by the current user's ID
        .single(); // Expect a single row for the user's profile

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw fetchError;
      }

      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setUsername(data.username || '');
        setBio(data.bio || '');
        setContactNumber(data.contact_number || '');
      } else {
        // If no profile found, initialize with user ID and empty strings
        setProfile({ id: user.id, full_name: '', username: '', avatar_url: '', bio: '', contact_number: '' });
        setFullName('');
        setUsername('');
        setBio('');
        setContactNumber('');
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err.message);
      setError(`Failed to load profile: ${err.message}`);
      toast.error(`Failed to load profile: ${err.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  // Effect to fetch profile data when user changes or on component mount
  useEffect(() => {
    if (!authLoading && user) { // Only fetch data once user auth state is known and user is logged in
      fetchProfile();
    } else if (!authLoading && !user) {
      // If authLoading is false and no user, means user is not logged in
      setLoadingData(false);
      toast.error('You must be logged in to view your profile.');
      // Optionally redirect to login page
      // router.push('/login');
    }
  }, [user, authLoading, supabase]); // Dependencies

  // Function to handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setError(null);

    if (!user?.id) {
      toast.error('User not logged in. Cannot update profile.');
      setUpdatingProfile(false);
      return;
    }

    try {
      const updates = {
        id: user.id,
        full_name: fullName,
        username: username,
        bio: bio,
        contact_number: contactNumber,
        updated_at: new Date().toISOString(), // Automatically update timestamp
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert(updates, {
          onConflict: 'id', // Update if ID exists, insert otherwise
        });

      if (updateError) {
        throw updateError;
      }

      toast.success('Profile updated successfully!');
      // Re-fetch profile to ensure local state is in sync
      fetchProfile();
    } catch (err: any) {
      console.error('Error updating profile:', err.message);
      setError(`Failed to update profile: ${err.message}`);
      toast.error(`Failed to update profile: ${err.message}`);
    } finally {
      setUpdatingProfile(false);
    }
  };

  if (authLoading || loadingData) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-700">Loading profile...</p>
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

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600">Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={user.email || ''}
                disabled // Email is usually managed by auth, not directly editable here
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={updatingProfile}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={updatingProfile}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={updatingProfile}
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                disabled={updatingProfile}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={updatingProfile}
            >
              {updatingProfile ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
