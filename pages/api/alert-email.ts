import type { NextApiRequest, NextApiResponse } from 'next';
import { sendTransactionAlertEmail } from '@/lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, type, amount } = req.body;

  if (!email || !type || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendTransactionAlertEmail(email, type, amount);
    res.status(200).json({ status: 'sent' });
  } catch (e) {
    console.error('Email failed', e);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
