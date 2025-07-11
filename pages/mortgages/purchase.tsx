import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function MortgagePurchase() {
  const [mortgageType, setMortgageType] = useState('fixed');
  const [propertyType, setPropertyType] = useState('primary');
  const [loanAmount, setLoanAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [estimatedRate, setEstimatedRate] = useState('');

  const calculateEstimatedRate = () => {
    // Simple rate calculation based on inputs
    const baseRate = 5.5; // Base rate for demonstration
    let rateAdjustment = 0;

    // Adjust rate based on credit score
    if (creditScore >= 760) rateAdjustment -= 0.25;
    else if (creditScore >= 720) rateAdjustment -= 0.15;
    else if (creditScore < 680) rateAdjustment += 0.25;

    // Adjust rate based on down payment
    const downPaymentPercent = (parseFloat(downPayment) / parseFloat(loanAmount)) * 100;
    if (downPaymentPercent >= 20) rateAdjustment -= 0.1;
    else if (downPaymentPercent < 10) rateAdjustment += 0.15;

    // Set estimated rate (for demonstration purposes)
    setEstimatedRate((baseRate + rateAdjustment).toFixed(2));
  };

  return (
    <Layout>
      <Head>
        <title>Home Mortgage | AsabaBank</title>
        <meta name="description" content="Get pre-approved for a home mortgage with AsabaBank. Competitive rates, flexible terms, and personalized service for your dream home." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Home Mortgage Options</h1>
            <p className="text-xl text-gray-600">
              Find the perfect mortgage for your dream home. We offer competitive rates and flexible terms to fit your needs.
            </p>
          </div>

          {/* Mortgage Calculator */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6">Mortgage Calculator</h2>
            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$300,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$60,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score</label>
                <input
                  type="number"
                  value={creditScore}
                  onChange={(e) => setCreditScore(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="750"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mortgage Type</label>
                <select
                  value={mortgageType}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="fixed">Fixed Rate</option>
                  <option value="adjustable">Adjustable Rate</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="primary">Primary Residence</option>
                  <option value="secondary">Second Home</option>
                  <option value="investment">Investment Property</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={calculateEstimatedRate}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Calculate Rate
                </button>
              </div>
              {estimatedRate && (
                <div className="md:col-span-2">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Estimated Rate</h3>
                    <div className="text-3xl font-bold text-indigo-700">
                      {estimatedRate}%
                    </div>
                    <p className="text-gray-600 mt-2">
                      This is an estimated rate based on your inputs. Actual rates may vary.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Mortgage Options */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Fixed Rate Mortgages */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Fixed Rate Mortgages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">30-Year Fixed</h3>
                  <div className="text-2xl font-bold text-indigo-700 mb-2">Starting at 5.25%</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Stable monthly payments</li>
                    <li>Long-term financing</li>
                    <li>Flexible payment options</li>
                    <li>Perfect for first-time buyers</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">15-Year Fixed</h3>
                  <div className="text-2xl font-bold text-indigo-700 mb-2">Starting at 4.75%</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Lower interest rates</li>
                    <li>Build equity faster</li>
                    <li>Shorter loan term</li>
                    <li>Ideal for refinancing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Adjustable Rate Mortgages */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Adjustable Rate Mortgages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">5/1 ARM</h3>
                  <div className="text-2xl font-bold text-indigo-700 mb-2">Starting at 4.50%</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Lower initial payments</li>
                    <li>Fixed rate for 5 years</li>
                    <li>Adjusts annually after 5 years</li>
                    <li>Great for short-term plans</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">7/1 ARM</h3>
                  <div className="text-2xl font-bold text-indigo-700 mb-2">Starting at 4.75%</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Longer fixed period</li>
                    <li>Lower payments initially</li>
                    <li>Adjusts annually after 7 years</li>
                    <li>Ideal for growing families</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose AsabaBank?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Personalized Service</h3>
                <p className="text-gray-600">
                  Our dedicated mortgage specialists will guide you through every step of the process, from pre-approval to closing.
                </p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Competitive Rates</h3>
                <p className="text-gray-600">
                  We offer some of the lowest rates in the industry, with options tailored to your financial situation.
                </p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Flexible Options</h3>
                <p className="text-gray-600">
                  Choose from fixed or adjustable rates, various terms, and specialized programs for first-time buyers and veterans.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Your Home Ownership Journey?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get pre-approved today and take the first step towards your dream home.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Contact a Specialist
              </a>
              <a
                href="/register"
                className="inline-block bg-white text-indigo-600 border border-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition"
              >
                Get Pre-Approved
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
