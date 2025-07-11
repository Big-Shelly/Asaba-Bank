import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = JSON.parse(req.body);

    const response = await fetch('https://jykafoyljnhhemisxwse.supabase.co/auth/v1/admin/users', {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'User created' });
    } else {
      res.status(500).json({ message: result.error?.message || 'Error creating user' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request body or server error' });
  }
}
