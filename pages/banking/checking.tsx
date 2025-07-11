import Head from 'next/head';
import Layout from '@/components/Layout';

export default function CheckingAccounts() {
  return (
    <Layout>
      <Head>
        <title>Checking Accounts | AsabaBank</title>
        <meta name="description" content="Experience high-yield checking accounts with cashback rewards, no fees, and innovative payment options." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-indigo-800 mb-6">Checking Accounts</h1>
          <p className="text-gray-700 text-lg mb-10">
            Bank smarter with AsabaBank's innovative checking accounts. Earn interest, get rewarded, and enjoy seamless payments with our industry-leading features.
          </p>

          {/* Featured Accounts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">High-Interest Checking</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  1.10% APY
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Earn interest on your daily balance</li>
                <li>No monthly maintenance fees</li>
                <li>No minimum balance requirement</li>
                <li>Free mobile and online banking</li>
                <li>FDIC insured</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">Cash Rewards Checking</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  3% Cashback
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>3% cashback on eligible purchases</li>
                <li>No annual fee</li>
                <li>Unlimited cashback rewards</li>
                <li>Instant rewards redemption</li>
                <li>Track rewards in real-time</li>
              </ul>
              <div className="mt-6">
                <a href="/account/open" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Open Account
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">Wearable Checking (Pay Ring)</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Tap & Pay
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Contactless payment ring</li>
                <li>Water-resistant design</li>
                <li>No monthly fees</li>
                <li>Worldwide acceptance</li>
                <li>Secure payment technology</li>
              </ul>
              <div className="mt-6">
                <a href="/pay-ring" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Why Choose AsabaBank Checking?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">No Hidden Fees</h3>
                <p className="text-gray-600">
                  We believe in transparency. No monthly maintenance fees, no minimum balance requirements, and no hidden charges.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Digital Banking</h3>
                <p className="text-gray-600">
                  Manage your money anytime, anywhere with our mobile app. Deposit checks, transfer funds, and monitor transactions instantly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Rewards Program</h3>
                <p className="text-gray-600">
                  Earn cashback on everyday purchases and redeem rewards instantly. Our rewards program is designed to benefit you.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Security First</h3>
                <p className="text-gray-600">
                  Your money is protected by FDIC insurance and our advanced security features. We use the latest encryption technology to keep your funds safe.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Direct Deposit</h3>
                <p className="text-gray-600">
                  Get paid up to 2 days early with our early direct deposit feature. Never wait for your paycheck again.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Mobile Check Deposit</h3>
                <p className="text-gray-600">
                  Deposit checks instantly using your smartphone. No need to visit a branch or ATM.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Budgeting Tools</h3>
                <p className="text-gray-600">
                  Track your spending, set goals, and stay on top of your finances with our built-in budgeting tools.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Zelle Integration</h3>
                <p className="text-gray-600">
                  Send and receive money instantly with Zelle. Split bills, pay friends, and make payments quickly and securely.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a href="/account/open" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
              Open a Checking Account
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
