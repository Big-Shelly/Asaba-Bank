import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function HomeEquity() {
  const [propertyValue, setPropertyValue] = useState('');
  const [loanBalance, setLoanBalance] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [rate, setRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [apr, setApr] = useState('');

  const calculateLoan = () => {
    const value = parseFloat(propertyValue);
    const balance = parseFloat(loanBalance);
    const amount = parseFloat(loanAmount);
    
    // Calculate LTV
    const ltv = ((balance + amount) / value) * 100;
    
    // Calculate rate based on LTV
    let baseRate = 5.75; // Base rate for demo
    if (ltv <= 70) {
      baseRate -= 0.25;
    } else if (ltv > 80) {
      baseRate += 0.25;
    }
    
    // Calculate APR
    const aprRate = baseRate + 0.5; // APR is typically higher than rate
    
    // Calculate monthly payment
    const monthlyRate = baseRate / 1200; // Convert annual rate to monthly decimal
    const n = 12 * 15; // 15-year term
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    
    setRate(baseRate.toFixed(2));
    setApr(aprRate.toFixed(2));
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <Layout>
      <Head>
        <title>Home Equity Loans | AsabaBank</title>
        <meta name="description" content="Access your home's equity with AsabaBank's home equity loans. Competitive rates, flexible terms, and personalized service to help you achieve your financial goals." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Home Equity Loans</h1>
            <p className="text-xl text-gray-600">
              Turn your home's equity into cash for home improvements, debt consolidation, or other financial goals.
            </p>
          </div>

          {/* Home Equity Calculator */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6">Home Equity Loan Calculator</h2>
            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Home Value</label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$400,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Mortgage Balance</label>
                <input
                  type="number"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$250,000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="home-improvements">Home Improvements</option>
                  <option value="debt-consolidation">Debt Consolidation</option>
                  <option value="education">Education Expenses</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired Loan Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$50,000"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={calculateLoan}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Calculate My Loan
                </button>
              </div>
              {rate && (
                <div className="md:col-span-2">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-4">Your Estimated Loan Terms</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Interest Rate</h4>
                        <div className="text-2xl font-bold text-indigo-700">{rate}%</div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">APR</h4>
                        <div className="text-2xl font-bold text-indigo-700">{apr}%</div>
                      </div>
                      <div className="col-span-2">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Monthly Payment</h4>
                        <div className="text-2xl font-bold text-indigo-700">${monthlyPayment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Home Equity Loan Options */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Home Equity Loan */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Home Equity Loan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">Fixed Rate</h3>
                  <div className="text-2xl font-bold text-indigo-700 mb-2">Starting at 5.75%</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Fixed monthly payments</li>
                    <li>15-year term available</li>
                    <li>No balloon payments</li>
                    <li>Up to 80% LTV</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">Loan Features</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Competitive fixed rates</li>
                    <li>No application fees</li>
                    <li>Quick approval process</li>
                    <li>Flexible repayment options</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Home Equity Line of Credit (HELOC) */}
            <div className="bg-white rounded-xl shadow p-8">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Home Equity Line of Credit (HELOC)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">Variable Rate</h3>
                  <div className="text-2xl font-bold text-indigo-700 mb-2">Starting at 4.75%</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Draw period up to 10 years</li>
                    <li>Repayment period up to 20 years</li>
                    <li>Interest-only payments during draw</li>
                    <li>Up to 80% LTV</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">HELOC Features</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Access funds as needed</li>
                    <li>No monthly payments during draw</li>
                    <li>Competitive variable rates</li>
                    <li>Flexible repayment options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose AsabaBank's Home Equity?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Competitive Rates</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Low fixed and variable rates</li>
                  <li>No hidden fees</li>
                  <li>Transparent pricing</li>
                  <li>Rate lock options</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Flexible Options</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Choose between loan or line of credit</li>
                  <li>Various term options</li>
                  <li>Multiple draw periods</li>
                  <li>Customizable repayment plans</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Personalized Service</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Dedicated loan specialists</li>
                  <li>Quick approval process</li>
                  <li>Local decision making</li>
                  <li>Expert guidance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Access Your Home's Equity?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let our mortgage specialists help you find the perfect home equity solution for your needs.
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
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
