import Head from 'next/head';
import Layout from '@/components/Layout';

export default function CDAccounts() {
  return (
    <Layout>
      <Head>
        <title>Certificates of Deposit | AsabaBank</title>
        <meta name="description" content="Secure your savings with AsabaBank's high-yield CDs. Choose from flexible terms, competitive rates, and earn up to 3.85% APY." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-6">Certificates of Deposit</h1>
          <p className="text-gray-700 text-lg mb-10">
            Secure your savings with guaranteed returns. Our CDs offer competitive rates and flexible terms to help you reach your financial goals.
          </p>

          {/* CD Term Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">3-Month CD</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  2.75% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>$500 minimum opening deposit</li>
                <li>Early withdrawal penalty: 60 days interest</li>
                <li>FDIC insured up to $250,000</li>
                <li>Automatic renewal with 10-day grace period</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">6-Month CD</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3.00% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>$1,000 minimum opening deposit</li>
                <li>Early withdrawal penalty: 90 days interest</li>
                <li>FDIC insured up to $250,000</li>
                <li>Automatic renewal with 10-day grace period</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">1-Year CD</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3.25% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>$2,500 minimum opening deposit</li>
                <li>Early withdrawal penalty: 180 days interest</li>
                <li>FDIC insured up to $250,000</li>
                <li>Automatic renewal with 10-day grace period</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">2-Year CD</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3.50% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>$5,000 minimum opening deposit</li>
                <li>Early withdrawal penalty: 360 days interest</li>
                <li>FDIC insured up to $250,000</li>
                <li>Automatic renewal with 10-day grace period</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">3-Year CD</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3.75% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>$10,000 minimum opening deposit</li>
                <li>Early withdrawal penalty: 540 days interest</li>
                <li>FDIC insured up to $250,000</li>
                <li>Automatic renewal with 10-day grace period</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">5-Year CD</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  4.00% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>$25,000 minimum opening deposit</li>
                <li>Early withdrawal penalty: 900 days interest</li>
                <li>FDIC insured up to $250,000</li>
                <li>Automatic renewal with 10-day grace period</li>
                <li>No monthly maintenance fees</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Why Choose AsabaBank CDs?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Guaranteed Returns</h3>
                <p className="text-gray-600">
                  Lock in your interest rate for the term of your CD. No surprises, just guaranteed growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Flexible Options</h3>
                <p className="text-gray-600">
                  Choose from 3-month to 5-year terms. Find the perfect duration for your savings goal.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">No Hidden Fees</h3>
                <p className="text-gray-600">
                  No maintenance fees, no service charges, and transparent early withdrawal penalties.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">FDIC Insurance</h3>
                <p className="text-gray-600">
                  Your CD is insured up to $250,000 by the FDIC. Your savings are protected.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How CDs Work</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Term</h3>
                <p className="text-gray-600">
                  Select a term that aligns with your financial goals. Shorter terms offer flexibility while longer terms provide higher rates.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Make Your Deposit</h3>
                <p className="text-gray-600">
                  Deposit your funds into your chosen CD. The minimum opening deposit is $1,000.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Earn Interest</h3>
                <p className="text-gray-600">
                  Your funds earn interest at the locked-in rate for the duration of your CD term.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Withdraw or Renew</h3>
                <p className="text-gray-600">
                  At maturity, you can withdraw your funds or choose to automatically renew your CD.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a href="/account/open" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
              Open a CD Account
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
