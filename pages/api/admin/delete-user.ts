import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = JSON.parse(req.body);

    const response = await fetch(`https://jykafoyljnhhemisxwse.supabase.co/auth/v1/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    if (response.ok) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      const result = await response.json();
      res.status(500).json({ message: result.error?.message || 'Error deleting user' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request body or server error' });
  }
}
