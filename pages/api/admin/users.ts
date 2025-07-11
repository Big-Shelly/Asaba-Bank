import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('https://jykafoyljnhhemisxwse.supabase.co/auth/v1/users', {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    const errorData = await response.json();
    res.status(500).json({ message: errorData.error?.message || 'Error fetching users' });
  }
}
