import Head from 'next/head';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function AccountOpening() {
  return (
    <Layout>
      <Head>
        <title>Open a Bank Account | AsabaBank</title>
        <meta name="description" content="Open a new bank account with AsabaBank. Simple, secure, and designed for your financial success." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Open a New Account</h1>
            <p className="text-xl text-gray-600">
              Get started with AsabaBank in just a few minutes. We'll help you choose the perfect account for your needs.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Before You Begin</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Required Documents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Valid government-issued ID (Driver's License, Passport, or State ID)</li>
                  <li>Social Security Number or ITIN</li>
                  <li>Proof of Address (Utility Bill, Lease Agreement, or Bank Statement)</li>
                  <li>Employment Verification (Paystub or W-2)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You must be at least 18 years old</li>
                  <li>Opening deposit of $100 required</li>
                  <li>Account opening is subject to approval</li>
                  <li>Processing time may take up to 24 hours</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What You'll Need</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Personal Information</li>
                  <li>Employment Details</li>
                  <li>Residency Information</li>
                  <li>Opening Deposit</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/account/open/step1" legacyBehavior>
              <a className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition">
                Start Account Opening
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
