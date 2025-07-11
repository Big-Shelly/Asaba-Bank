import Head from 'next/head';
import Layout from '@/components/Layout';

export default function SavingsAccounts() {
  return (
    <Layout>
      <Head>
        <title>Savings Accounts | AsabaBank</title>
        <meta name="description" content="Grow your savings with AsabaBank's high-yield savings accounts. Earn up to 4.25% APY with no monthly fees or minimums." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-6">Savings Accounts</h1>
          <p className="text-gray-700 text-lg mb-10">
            Grow your savings with competitive rates and flexible options. Our savings accounts are designed to help you reach your financial goals while keeping your money safe and accessible.
          </p>

          {/* Featured Accounts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">Life Green Savings</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  4.25% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Competitive interest rate</li>
                <li>No minimum balance requirement</li>
                <li>FDIC insured up to $250,000</li>
                <li>Free mobile and online banking</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/register" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">Money Market Savings</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  4.00% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Higher interest rates</li>
                <li>$2,500 minimum balance</li>
                <li>Check writing capability</li>
                <li>Debit card access</li>
                <li>Ideal for emergency funds</li>
              </ul>
              <div className="mt-6">
                <a href="/register" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">Kids Savings</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3.50% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>For ages 0-18</li>
                <li>No minimum balance</li>
                <li>No monthly fees</li>
                <li>FDIC insured</li>
                <li>Teach kids about saving</li>
              </ul>
              <div className="mt-6">
                <a href="/register" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Why Choose AsabaBank Savings?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Competitive Rates</h3>
                <p className="text-gray-600">
                  We consistently offer some of the highest savings rates in the industry. Our rates are updated regularly to reflect market conditions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">No Hidden Fees</h3>
                <p className="text-gray-600">
                  No monthly maintenance fees, no minimum balance requirements, and no hidden charges. We believe in transparent pricing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">24/7 Access</h3>
                <p className="text-gray-600">
                  Manage your savings anytime, anywhere with our mobile app and online banking. Check balances, make transfers, and view statements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">FDIC Insurance</h3>
                <p className="text-gray-600">
                  Your money is protected by FDIC insurance up to $250,000 per depositor. Bank with confidence knowing your savings are secure.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How to Get Started</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4">
              <li>
                <strong>Choose Your Account</strong> - Select the savings account that best fits your needs
              </li>
              <li>
                <strong>Apply Online</strong> - Complete our simple online application process
              </li>
              <li>
                <strong>Set Up Transfers</strong> - Link your existing accounts for easy transfers
              </li>
              <li>
                <strong>Start Saving</strong> - Begin earning interest on your deposits
              </li>
            </ol>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a href="/register" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
              Open a Savings Account
            </a>
            <p className="text-gray-600 mt-4">
              Already have an account? <a href="/dashboard" className="text-indigo-600 hover:text-indigo-700">Log in to get started</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
