import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Explicitly type the event as React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (in production, replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  // Explicitly type the event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      <Head>
        <title>Contact Us | AsabaBank</title>
        <meta
          name="description"
          content="Contact AsabaBank for support, inquiries, or to speak with a specialist. We're here to help you with all your banking needs."
        />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              We're here to help! Whether you have questions about our products or need assistance with your account, our team is ready to assist you.
            </p>
          </div>

          {/* ... rest of your JSX unchanged ... */}

          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-8">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* form inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {/* ... other inputs unchanged ... */}
              <div className="md:col-span-2">
                {submissionSuccess ? (
                  <div className="bg-green-50 p-4 rounded-lg text-green-700">
                    Thank you for your message! We'll get back to you shortly.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ... quick links section unchanged ... */}
        </div>
      </section>
    </Layout>
  );
}
