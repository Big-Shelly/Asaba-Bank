import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function Mortgages() {
  return (
    <>
      <Head>
        <title>Mortgages | Asaba National Bank</title>
        <meta
          name="description"
          content="Explore competitive mortgage rates and personalized home loan solutions from Asaba National Bank."
        />
      </Head>

      <Navbar />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mortgage Solutions</h1>
            <p className="text-xl text-gray-600">
              Find your dream home with our competitive rates and personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Mortgage Types Grid */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fixed Rate Mortgages</h3>
              <p className="text-gray-600 mb-4">
                Stable monthly payments with competitive rates
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>15-year fixed</li>
                <li>20-year fixed</li>
                <li>30-year fixed</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Adjustable Rate Mortgages (ARMs)</h3>
              <p className="text-gray-600 mb-4">
                Lower initial rates with flexible payment options
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>5/1 ARM</li>
                <li>7/1 ARM</li>
                <li>10/1 ARM</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Special Programs</h3>
              <p className="text-gray-600 mb-4">
                Custom solutions for unique needs
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>First-time homebuyer programs</li>
                <li>ITIN mortgage options</li>
                <li>Energy-efficient home loans</li>
              </ul>
            </div>
          </div>

          {/* Mortgage Calculator */}
          <div className="bg-blue-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mortgage Calculator</h2>
            <p className="text-gray-600 mb-6">
              Estimate your monthly payments and total costs
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="$500,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="20%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="4.5%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option>15 years</option>
                  <option>20 years</option>
                  <option>30 years</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate Payment
              </button>
            </form>
          </div>

          {/* Why Choose Us Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Asaba National Bank</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-2xl text-blue-600">✓</span>
                  <span>
                    <strong>Competitive Rates</strong> - We consistently offer some of the most
                    competitive mortgage rates in the industry
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl text-blue-600">✓</span>
                  <span>
                    <strong>Personalized Service</strong> - Our dedicated mortgage specialists
                    provide one-on-one guidance throughout the process
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl text-blue-600">✓</span>
                  <span>
                    <strong>Flexible Options</strong> - We offer multiple loan programs to fit
                    your unique financial situation
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl text-blue-600">✓</span>
                  <span>
                    <strong>Local Expertise</strong> - With deep roots in New York, we understand
                    the local real estate market
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">The Mortgage Process</h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-4">
                <li>
                  <strong>Pre-Approval</strong> - Get pre-approved to know how much home you can afford
                </li>
                <li>
                  <strong>Application</strong> - Complete our streamlined application process
                </li>
                <li>
                  <strong>Underwriting</strong> - Our team reviews your application and documentation
                </li>
                <li>
                  <strong>Closing</strong> - Finalize your loan and take possession of your new home
                </li>
              </ol>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors mb-4"
            >
              Get Pre-Approved Today
            </a>
            <p className="text-gray-500 text-sm">
              Ready to start your home ownership journey? Our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
