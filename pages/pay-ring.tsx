import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function PayRing() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white min-h-screen">
        <Head>
          <title>AsabaBank Pay Ring – Tap & Pay Seamlessly</title>
          <meta
            name="description"
            content="Experience contactless payments with the AsabaBank Pay Ring. Linked to your checking account for effortless transactions."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-6">
              AsabaBank Pay Ring
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Wear the future of payments on your finger. Our Pay Ring lets you tap to pay anywhere contactless payments are accepted — directly linked to your AsabaBank checking account.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
              <li>Secure, encrypted transactions</li>
              <li>Water-resistant, durable design</li>
              <li>No monthly fees or hidden costs</li>
              <li>Works worldwide wherever contactless payments are accepted</li>
            </ul>
            <Link href="/auth/login" legacyBehavior>
              <a className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                Get Your Pay Ring
              </a>
            </Link>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/pay-ring.png"
              alt="AsabaBank Pay Ring device"
              className="rounded-xl shadow-lg max-w-full w-80"
              loading="lazy"
            />
          </div>
        </section>

        {/* Related Products */}
        <section className="bg-indigo-50 py-12 text-center">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6">
            Explore More Banking Products
          </h2>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            <Link href="/banking/checking" legacyBehavior>
              <a className="px-5 py-3 bg-white rounded shadow hover:bg-indigo-100 transition">
                Checking Accounts
              </a>
            </Link>
            <Link href="/banking/savings" legacyBehavior>
              <a className="px-5 py-3 bg-white rounded shadow hover:bg-indigo-100 transition">
                Savings Accounts
              </a>
            </Link>
            <Link href="/mortgages" legacyBehavior>
              <a className="px-5 py-3 bg-white rounded shadow hover:bg-indigo-100 transition">
                Mortgage Loans
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="px-5 py-3 bg-white rounded shadow hover:bg-indigo-100 transition">
                About AsabaBank
              </a>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-12 text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-4 text-sm">
          <div className="flex justify-center gap-4">
            <Link href="/privacy" legacyBehavior>
              <a className="underline hover:text-indigo-300">Privacy Policy</a>
            </Link>
            <span>·</span>
            <Link href="/help" legacyBehavior>
              <a className="underline hover:text-indigo-300">Help Center</a>
            </Link>
          </div>
          <p>
            Member FDIC · Equal Housing Lender · &copy; {new Date().getFullYear()} AsabaBank
          </p>
        </div>
      </footer>
    </>
  );
}
