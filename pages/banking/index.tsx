import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function BankingOverview() {
  return (
    <Layout>
      <Head>
        <title>Banking Products | AsabaBank</title>
        <meta name="description" content="Discover AsabaBank's complete range of banking products including high-yield checking, savings, and CD accounts. Earn competitive rates and enjoy innovative features." />
      </Head>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Banking Solutions for Every Need</h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose from our award-winning banking products designed to help you grow your wealth and achieve your financial goals.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/account/open" legacyBehavior>
                <a className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="inline-block bg-white text-indigo-600 border border-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition">
                  Log In
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Banking Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Checking Account Card */}
            <Link href="/banking/checking" legacyBehavior>
              <a className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-indigo-700">Checking Accounts</h2>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Up to 1.10% APY
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>High-yield interest on daily balance</li>
                  <li>3% cashback on eligible purchases</li>
                  <li>Free mobile and online banking</li>
                  <li>Early direct deposit available</li>
                  <li>Asaba Pay Ring compatible</li>
                </ul>
                <div className="mt-6">
                  <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium group-hover:bg-indigo-100 transition">
                    Learn More →
                  </span>
                </div>
              </a>
            </Link>

            {/* Savings Account Card */}
            <Link href="/banking/savings" legacyBehavior>
              <a className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-indigo-700">Savings Accounts</h2>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Up to 4.25% APY
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>No minimum balance requirement</li>
                  <li>No monthly maintenance fees</li>
                  <li>FDIC insured up to $250,000</li>
                  <li>Free mobile and online banking</li>
                  <li>Kids Savings option available</li>
                </ul>
                <div className="mt-6">
                  <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium group-hover:bg-indigo-100 transition">
                    Learn More →
                  </span>
                </div>
              </a>
            </Link>

            {/* CD Account Card */}
            <Link href="/banking/cd" legacyBehavior>
              <a className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-indigo-700">Certificates of Deposit</h2>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Up to 4.00% APY
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Terms from 3 months to 5 years</li>
                  <li>Competitive rates locked in</li>
                  <li>FDIC insured up to $250,000</li>
                  <li>Automatic renewal option</li>
                  <li>No hidden fees</li>
                </ul>
                <div className="mt-6">
                  <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium group-hover:bg-indigo-100 transition">
                    Learn More →
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose AsabaBank?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Competitive Rates</h3>
                <p className="text-gray-600">
                  We consistently offer some of the highest rates in the industry. Our rates are updated regularly to reflect market conditions.
                </p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">No Hidden Fees</h3>
                <p className="text-gray-600">
                  No monthly maintenance fees, no minimum balance requirements, and no hidden charges. We believe in transparent pricing.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Digital Banking</h3>
                <p className="text-gray-600">
                  Manage your money anytime, anywhere with our mobile app. Deposit checks, transfer funds, and monitor transactions instantly.
                </p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer support team is available 24/7 to help you with any questions or concerns. We're here to help you succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Banking with AsabaBank?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the account that's right for you and start earning competitive rates today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/account/open" legacyBehavior>
              <a className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition">
                Open an Account
              </a>
            </Link>
            <Link href="/dashboard" legacyBehavior>
              <a className="inline-block bg-white text-indigo-600 border border-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition">
                View My Accounts
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
