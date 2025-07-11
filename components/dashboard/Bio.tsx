import { useState, useEffect } from 'react';
import { useSupabase } from '@/hooks/useSupabase';

interface BioProps {
  name: string;
}

const Bio: React.FC<BioProps> = ({ name }) => {
  const supabase = useSupabase();
  const [bio, setBio] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBio = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('bio')
          .eq('full_name', name)
          .single();

        if (error) {
          setError(error.message);
        } else if (data) {
          setBio(data.bio || '');
        }
      } catch (err) {
        setError('Failed to fetch bio');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchBio();
    }
  }, [name, supabase]);

  if (loading) return <p>Loading bio...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="bio">
      <h2 className="text-xl font-semibold mb-2">{name}'s Bio</h2>
      <p>{bio || 'No bio available.'}</p>
    </div>
  );
};

export default Bio;
