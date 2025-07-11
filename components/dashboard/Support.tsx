import { useState } from 'react';

type AccountType = 'Checking' | 'Savings';

export default function Support() {
  const [accountType, setAccountType] = useState<AccountType>('Checking');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validateDates = () => {
    if (!fromDate || !toDate) {
      setMessage({ type: 'error', text: 'Please select both From and To dates.' });
      return false;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      setMessage({ type: 'error', text: 'From date cannot be after To date.' });
      return false;
    }
    return true;
  };

  const handleGenerateStatement = async () => {
    if (!validateDates()) return;

    setIsGenerating(true);
    setMessage(null);

    try {
      // TODO: Replace with real API call to generate/download statement
      await new Promise((r) => setTimeout(r, 1500)); // simulate delay

      setMessage({ type: 'success', text: `Statement generated for ${accountType} account.` });
    } catch {
      setMessage({ type: 'error', text: 'Failed to generate statement. Please try again later.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmailStatement = async () => {
    if (!validateDates()) return;
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address.' });
      return;
    }

    setIsGenerating(true);
    setMessage(null);

    try {
      const response = await fetch('/api/send-statement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, accountType, fromDate, toDate }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to send statement.');

      setMessage({ type: 'success', text: data.message });
      setEmail('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to send email. Please try again later.' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-12">
      <h1 className="text-3xl font-bold text-indigo-900 mb-4">Support & Help Center</h1>

      {/* Support Overview / FAQ */}
      <section>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Frequently Asked Questions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>How do I reset my password?</strong> - You can reset your password on the login page by clicking "Forgot Password".</li>
          <li><strong>How can I update my contact details?</strong> - Visit your profile page and update your phone number or address.</li>
          <li><strong>What are the banking hours?</strong> - Our customer support is available Monday through Friday, 8 AM - 6 PM EST.</li>
          <li><strong>How do I report a lost or stolen card?</strong> - Contact our support immediately via phone or email (see below).</li>
          <li><strong>Are my funds insured?</strong> - Yes, Asaba Bank is FDIC-insured for up to $250,000 per depositor.</li>
        </ul>
      </section>

      {/* Statement Request Section */}
      <section>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Request Account Statements</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateStatement();
          }}
          className="space-y-4 mb-8"
        >
          <div>
            <label htmlFor="accountType" className="block font-medium mb-1">
              Account Type
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="fromDate" className="block font-medium mb-1">
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="toDate" className="block font-medium mb-1">
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Statement'}
          </button>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailStatement();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isGenerating ? 'Sending...' : 'Send Statement to Email'}
          </button>
        </form>
      </section>

      {/* Contact Support */}
      <section>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Contact Customer Support</h2>
        <p className="mb-2 text-gray-700">
          If you need further assistance, please reach out to our customer support team:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li><strong>Phone:</strong> <a href="tel:+18001234567" className="text-indigo-600 underline">1-800-123-4567</a> (Mon-Fri 8am-6pm EST)</li>
          <li><strong>Email:</strong> <a href="mailto:support@asababank.com" className="text-indigo-600 underline">support@asababank.com</a></li>
          <li><strong>Live Chat:</strong> Available on our website during business hours</li>
        </ul>
      </section>

      {/* Troubleshooting Tips */}
      <section>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Troubleshooting Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Make sure your internet connection is stable.</li>
          <li>Clear your browser cache and cookies if you experience display issues.</li>
          <li>Use a supported browser (latest Chrome, Firefox, Edge, Safari).</li>
          <li>If you can’t log in, try resetting your password.</li>
          <li>Contact support if you notice any suspicious activity on your account.</li>
        </ul>
      </section>
    </div>
  );
}
