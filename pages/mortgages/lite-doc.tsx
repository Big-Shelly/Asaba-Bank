import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function LiteDoc() {
  const [propertyValue, setPropertyValue] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [estimatedRate, setEstimatedRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);

  const calculateLoan = () => {
    const value = parseFloat(propertyValue);
    const downPmt = parseFloat(downPayment);
    const credit = parseInt(creditScore);
    
    // Calculate loan amount
    const loanAmt = value - downPmt;
    setLoanAmount(loanAmt.toFixed(0));
    
    // Calculate rate based on credit score
    let baseRate = 5.5; // Base rate
    if (credit >= 760) baseRate -= 0.25;
    else if (credit >= 720) baseRate -= 0.15;
    else if (credit < 680) baseRate += 0.25;
    
    // Calculate monthly payment
    const monthlyRate = baseRate / 1200; // Convert annual rate to monthly decimal
    const n = 12 * 30; // 30-year term
    const monthlyPmt = (loanAmt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    
    setEstimatedRate(baseRate.toFixed(2));
    setMonthlyPayment(monthlyPmt.toFixed(2));
    
    // Determine required documents
    const docs = [];
    if (loanAmt > 400000) docs.push('Tax Returns');
    if (credit < 700) docs.push('Bank Statements');
    docs.push('Driver\'s License');
    docs.push('Proof of Income');
    setRequiredDocuments(docs);
  };

  return (
    <Layout>
      <Head>
        <title>Lite-Doc Mortgage | AsabaBank</title>
        <meta name="description" content="Get pre-approved for a lite-doc mortgage with AsabaBank. Minimal documentation required, competitive rates, and fast approval process." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Lite-Doc Mortgage</h1>
            <p className="text-xl text-gray-600">
              Get pre-approved with minimal documentation. Perfect for self-employed individuals and those with complex income situations.
            </p>
          </div>

          {/* Lite-Doc Calculator */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6">Lite-Doc Mortgage Calculator</h2>
            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Value</label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$500,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$100,000"
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
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={calculateLoan}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Calculate My Loan
                </button>
              </div>
              {estimatedRate && (
                <div className="md:col-span-2">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-4">Your Estimated Loan Terms</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Loan Amount</h4>
                        <div className="text-2xl font-bold text-indigo-700">${loanAmount}</div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Interest Rate</h4>
                        <div className="text-2xl font-bold text-indigo-700">{estimatedRate}%</div>
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

          {/* Lite-Doc Benefits */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Minimal Documentation</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>No tax returns required</li>
                  <li>No W-2 forms needed</li>
                  <li>Basic income verification</li>
                  <li>Flexible documentation options</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Who It's For</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Self-employed individuals</li>
                  <li>Commission-based workers</li>
                  <li>Recent job changes</li>
                  <li>Complex income situations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Required Documents</h2>
            <p className="text-gray-600 text-center mb-6">
              Based on your loan amount and credit score, you may need to provide the following documents:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Basic Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Driver's License</li>
                  <li>Social Security Card</li>
                  <li>Proof of Income</li>
                  <li>Bank Statements</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Additional Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Tax Returns (if loan > $400K)</li>
                  <li>Business Documents</li>
                  <li>Asset Statements</li>
                  <li>Investment Accounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">The Lite-Doc Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">1. Pre-Approval</h3>
                <p className="text-gray-600">
                  Get pre-approved with minimal documentation. We'll review your basic information and credit score.
                </p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">2. Documentation</h3>
                <p className="text-gray-600">
                  Provide the required documents based on your loan amount and situation. Our team will guide you through the process.
                </p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">3. Closing</h3>
                <p className="text-gray-600">
                  Complete the closing process with our dedicated team. We'll handle all the details to ensure a smooth transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Get Pre-Approved?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let our mortgage specialists help you get pre-approved with minimal documentation.
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
