import DashboardNavbar from '@/components/dashboard/Navbar';
import Bio from '@/components/dashboard/Bio';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BioPage() {
  const user = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, phone1, phone2, address')
        .eq('id', user.id)
        .single();
      if (!error && data) setUserData(data);
    };
    fetchUserData();
  }, [user]);

  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <DashboardNavbar showHome />
      <main className="max-w-4xl mx-auto mt-8 p-6">
        <Bio
          name={userData.full_name}
          email={userData.email}
          phone1={userData.phone1}
          phone2={userData.phone2}
          address={userData.address}
          userId={user.id}
        />
      </main>
    </>
  );
}
