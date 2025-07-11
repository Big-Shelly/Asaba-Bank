import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface StatementData {
  email: string;
  accountType: 'Checking' | 'Savings';
  fromDate: string;
  toDate: string;
}

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, accountType, fromDate, toDate } = req.body as StatementData;

  if (!email || !accountType || !fromDate || !toDate) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Create reusable transporter object using SMTP transport (from env variables)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Here you would generate a real statement. For demo, simple text:
    const statementText = `
Account Statement for your ${accountType} Account
Period: ${fromDate} to ${toDate}

This is a sample statement. Replace this text with actual statement details.
`;

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Asaba Bank" <no-reply@asababank.com>',
      to: email,
      subject: `Your ${accountType} Account Statement (${fromDate} to ${toDate})`,
      text: statementText,
    });

    res.status(200).json({ success: true, message: 'Statement emailed successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
}
