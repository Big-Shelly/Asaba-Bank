import Head from 'next/head';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { generateReferenceCode } from '@/utils/referenceCode';

export default function AccountOpeningConfirmation() {
  const referenceCode = generateReferenceCode();
  return (
    <Layout>
      <Head>
        <title>Account Opening Confirmation | AsabaBank</title>
        <meta name="description" content="Thank you for opening an account with AsabaBank. Your application is being processed." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600">
              Your account application has been submitted successfully.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Application Status</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="space-y-4">
                    <p className="text-lg text-gray-700">
                      Your application is currently being processed. We'll review your information and contact you within 24-48 hours.
                    </p>
                    <div className="bg-indigo-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-indigo-800">Reference Code:</span>
                        <span className="text-xl font-mono bg-white px-4 py-2 rounded-lg border border-indigo-300">
                          {referenceCode}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Please keep this reference code safe. You'll need it to verify your application and create online access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">What Happens Next</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>We'll review your application</li>
                    <li>You'll receive an email with updates</li>
                    <li>Our team may contact you for additional information</li>
                    <li>If approved, you'll receive your account details</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Next Steps</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Check your email for updates</li>
                    <li>Keep your application documents handy</li>
                    <li>Be prepared for a phone call from our team</li>
                    <li>Review your application status in your dashboard</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Us</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-600 mb-4">
                    Have questions about your application? Our team is here to help.
                  </p>
                  <div className="space-y-2">
                    <p className="text-indigo-600">(212) 555-1234</p>
                    <p className="text-indigo-600">support@asababank.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" legacyBehavior>
              <a className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition">
                Return to Homepage
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
