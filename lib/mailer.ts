import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.mailjet.com', // or smtp.migadu.com
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // Mailjet/Migadu username
    pass: process.env.SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (to: string) => {
  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: auto;">
      <h1 style="color: #4f46e5;">👋 Welcome to Asaba Bank</h1>
      <p>Thank you for registering with us.</p>
      <p>Explore your dashboard, make deposits or withdrawals, and enjoy secure online banking.</p>
      <br />
      <strong>AsabaBank Team</strong>
    </div>
  `;

  return await transporter.sendMail({
    from: '"AsabaBank" <noreply@asabank.com>',
    to,
    subject: '🎉 Welcome to Asaba Bank',
    html,
  });
};

export const sendTransactionAlertEmail = async (to: string, type: 'deposit' | 'withdrawal', amount: number) => {
  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: auto;">
      <h1 style="color: ${type === 'deposit' ? '#4f46e5' : '#ef4444'};">
        ${type === 'deposit' ? '💰' : '💸'} Transaction Alert
      </h1>
      <p>Your account has been ${type === 'deposit' ? 'credited' : 'debited'}:</p>
      <p style="font-size: 1.25rem; font-weight: 600;">
        $${amount.toFixed(2)}
      </p>
      <p style="margin-top: 1rem;">
        This is an automated notification. Please keep this email for your records.
      </p>
      <br />
      <strong>AsabaBank Team</strong>
    </div>
  `;

  return await transporter.sendMail({
    from: '"AsabaBank" <noreply@asabank.com>',
    to,
    subject: `${type === 'deposit' ? '💰' : '💸'} Transaction Alert - $${amount.toFixed(2)}`,
    html,
  });
};
