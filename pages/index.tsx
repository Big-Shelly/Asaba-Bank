// pages/index.tsx
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import DashboardNavbar from '@/components/dashboard/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>AsabaBank – The Adaptive Digital Bank</title>
        <meta
          name="description"
          content="Earn top APYs, access mortgages, & innovate your banking with AsabaBank."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative bg-white py-20 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-extrabold text-indigo-800">
              The adaptive digital bank.
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Homeownership for Everyone – ITIN Loans for Non‑U.S. Citizens
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Open an Account
              </Link>
              <Link
                href="/auth/login"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
              >
                Login
              </Link>
            </div>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              {['NerdWallet 4.5★', 'Bankrate 4.7★', 'SmartAsset 4.8★', 'US News 4.8★'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 bg-indigo-50 text-indigo-800 rounded-lg text-sm whitespace-nowrap"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
          <img
            src="/hero-section.png"
            alt=""
            className="mt-12 mx-auto max-w-full rounded-xl shadow-lg"
            loading="lazy"
          />
        </section>

        {/* Banking Products Section */}
        <section id="banking" className="bg-indigo-50 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-800">
              Expect more from your bank
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              High interest yields, no fees, and innovative tools.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            {[
              { title: 'Checking', apy: 'Up to 1.10% APY', note: 'Cashback & high yield', href: '/banking/checking' },
              { title: 'Savings', apy: 'Up to 4.25% APY', note: 'Accelerate your savings', href: '/banking/savings' },
              { title: 'Certificate of Deposit', apy: 'Up to 3.85% APY', note: 'Fixed-rate security', href: '/banking/cd' }
            ].map(({ title, apy, note, href }) => (
              <Link
                key={title}
                href={href}
                className="block p-6 bg-white rounded-xl shadow ring-1 ring-indigo-100 hover:ring-indigo-300 transition"
              >
                <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
                <p className="text-2xl font-bold mt-2">{apy}</p>
                <p className="text-gray-600 mt-1">{note}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pay Ring Section */}
        <section id="pay-ring" className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
            <img
              src="/pay-ring.png"
              alt="AsabaBank Pay Ring"
              className="rounded-xl shadow w-full md:w-1/2"
              loading="lazy"
            />
            <div>
              <h2 className="text-3xl font-bold text-indigo-800">AsabaBank Pay Ring</h2>
              <p className="mt-4 text-gray-600">
                A free wearable payment device linked directly to your checking account.
                Tap and go securely.
              </p>
              <Link
                href="/pay-ring"
                className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Get Yours
              </Link>
            </div>
          </div>
        </section>

        {/* Mortgages Section */}
        <section id="mortgages" className="bg-indigo-50 py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-indigo-800">
              Loans as Unique as You Are
            </h2>
            <p className="mt-4 text-gray-600">
              Flexible mortgage options for non‑traditional borrowers
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                { title: 'Purchase', href: '/mortgages/purchase' },
                { title: 'Refinance', href: '/mortgages/refinance' },
                { title: 'Home Equity', href: '/mortgages/home-equity' }
              ].map(({ title, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="p-6 bg-white rounded-xl shadow ring-1 ring-indigo-100 hover:ring-indigo-300 transition block"
                >
                  <h3 className="font-semibold text-indigo-700">{title}</h3>
                </Link>
              ))}
            </div>
            <Link
              href="/mortgages/lite-doc"
              className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Lite Documentation Loans
            </Link>
          </div>
        </section>

        {/* Community Section */}
        <section className="bg-white py-20 text-center">
          <h2 className="text-4xl font-bold text-indigo-800">Community Roots. National Impact.</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We support families, shelters, and environmental causes across the country.
          </p>
        </section>

        {/* Final CTA Section */}
        <section className="bg-indigo-50 py-20 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Ready to get started?</h2>
          <Link
            href="/register"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Join AsabaBank Now
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-indigo-800 text-white py-12 text-center">
          <div className="max-w-6xl mx-auto px-6 space-y-4 text-sm">
            <div className="flex justify-center gap-4">
              <Link href="/privacy" className="underline hover:text-indigo-300">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/help" className="underline hover:text-indigo-300">
                Help Center
              </Link>
            </div>
            <p>Member FDIC · Equal Housing Lender · &copy; {new Date().getFullYear()} AsabaBank</p>
          </div>
        </footer>
      </main>
    </>
  );
}
