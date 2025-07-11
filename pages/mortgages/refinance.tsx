import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function MortgageRefinance() {
  const [currentLoan, setCurrentLoan] = useState({
    balance: '',
    rate: '',
    term: '',
    monthlyPayment: ''
  });

  const [newLoan, setNewLoan] = useState({
    balance: '',
    rate: '',
    term: '',
    monthlyPayment: '',
    closingCosts: '',
    breakeven: ''
  });

  const [refinanceType, setRefinanceType] = useState('rate-term');
  const [propertyValue, setPropertyValue] = useState('');
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [closingCosts, setClosingCosts] = useState('');

  const calculateNewLoan = () => {
    const currentBalance = parseFloat(currentLoan.balance);
    const currentRate = parseFloat(currentLoan.rate) / 100;
    const currentTerm = parseFloat(currentLoan.term);
    const newRate = parseFloat(newLoan.rate) / 100;
    const newTerm = parseFloat(newLoan.term);
    const closingCosts = parseFloat(newLoan.closingCosts);

    // Calculate current monthly payment if not provided
    if (!currentLoan.monthlyPayment) {
      const monthlyRate = currentRate / 12;
      const n = currentTerm * 12;
      const monthlyPayment = (currentBalance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      setCurrentLoan(prev => ({ ...prev, monthlyPayment: monthlyPayment.toFixed(2) }));
    }

    // Calculate new monthly payment
    const monthlyRateNew = newRate / 12;
    const nNew = newTerm * 12;
    const newBalance = refinanceType === 'cash-out' ? currentBalance + parseFloat(cashOutAmount) : currentBalance;
    const monthlyPaymentNew = (newBalance * monthlyRateNew) / (1 - Math.pow(1 + monthlyRateNew, -nNew));
    setNewLoan(prev => ({ ...prev, monthlyPayment: monthlyPaymentNew.toFixed(2) }));

    // Calculate breakeven point
    const monthlySavings = parseFloat(currentLoan.monthlyPayment) - monthlyPaymentNew;
    const breakevenMonths = closingCosts / monthlySavings;
    setNewLoan(prev => ({ ...prev, breakeven: breakevenMonths.toFixed(0) }));
  };

  return (
    <Layout>
      <Head>
        <title>Mortgage Refinance | AsabaBank</title>
        <meta name="description" content="Refinance your mortgage with AsabaBank. Lower your rate, cash out equity, or adjust your loan term. Get personalized refinance options today." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Mortgage Refinance Options</h1>
            <p className="text-xl text-gray-600">
              Save money and customize your mortgage. Choose from rate-and-term refinances or cash-out options.
            </p>
          </div>

          {/* Current Loan Information */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6">Your Current Mortgage</h2>
            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Loan Balance</label>
                <input
                  type="number"
                  value={currentLoan.balance}
                  onChange={(e) => setCurrentLoan(prev => ({ ...prev, balance: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$300,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Interest Rate</label>
                <input
                  type="number"
                  value={currentLoan.rate}
                  onChange={(e) => setCurrentLoan(prev => ({ ...prev, rate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="5.50%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Loan Term</label>
                <select
                  value={currentLoan.term}
                  onChange={(e) => setCurrentLoan(prev => ({ ...prev, term: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="15">15 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Payment</label>
                <input
                  type="number"
                  value={currentLoan.monthlyPayment}
                  onChange={(e) => setCurrentLoan(prev => ({ ...prev, monthlyPayment: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="$1,500"
                />
              </div>
            </form>
          </div>

          {/* Refinance Options */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Refinance Type</h2>
                <div className="space-y-4">
                  <label className="block">
                    <input
                      type="radio"
                      value="rate-term"
                      checked={refinanceType === 'rate-term'}
                      onChange={(e) => setRefinanceType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Rate and Term Refinance</span>
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      value="cash-out"
                      checked={refinanceType === 'cash-out'}
                      onChange={(e) => setRefinanceType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Cash-Out Refinance</span>
                  </label>
                </div>

                {refinanceType === 'cash-out' && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cash Out Amount</label>
                    <input
                      type="number"
                      value={cashOutAmount}
                      onChange={(e) => setCashOutAmount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="$50,000"
                    />
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Value</label>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="$400,000"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Closing Costs</label>
                  <input
                    type="number"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="$3,000"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow p-8">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6">New Loan Options</h2>
                <form className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Loan Balance</label>
                    <input
                      type="number"
                      value={newLoan.balance}
                      onChange={(e) => setNewLoan(prev => ({ ...prev, balance: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="$300,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Interest Rate</label>
                    <input
                      type="number"
                      value={newLoan.rate}
                      onChange={(e) => setNewLoan(prev => ({ ...prev, rate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="4.75%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Loan Term</label>
                    <select
                      value={newLoan.term}
                      onChange={(e) => setNewLoan(prev => ({ ...prev, term: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="15">15 Years</option>
                      <option value="30">30 Years</option>
                    </select>
                  </div>
                </form>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={calculateNewLoan}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Calculate Refinance
                  </button>
                </div>

                {newLoan.monthlyPayment && (
                  <div className="mt-6 bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-4">Refinance Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Monthly Savings</h4>
                        <div className="text-2xl font-bold text-indigo-700">
                          ${((parseFloat(currentLoan.monthlyPayment) - parseFloat(newLoan.monthlyPayment)).toFixed(2))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Breakeven Point</h4>
                        <div className="text-2xl font-bold text-indigo-700">
                          {newLoan.breakeven} months
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Refinance Benefits */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Refinance with AsabaBank?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Lower Your Rate</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access lower interest rates</li>
                  <li>Reduce monthly payments</li>
                  <li>Save thousands in interest</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Cash Out Equity</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access home equity</li>
                  <li>Pay off debts</li>
                  <li>Finance home improvements</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Shorten Your Term</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Pay off your mortgage faster</li>
                  <li>Build equity quicker</li>
                  <li>Retire debt-free</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Save Money?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let our mortgage specialists help you find the perfect refinance option for your needs.
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
                Start Refinance Process
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
