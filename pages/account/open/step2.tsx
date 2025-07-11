import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Step2FormData {
  employmentStatus: string;
  occupation: string;
  employer: string;
  income: string;
  accountType: string;
  initialDeposit: string;
  termsAccepted: boolean;
}

export default function AccountOpeningStep2() {
  const router = useRouter();
  const [formData, setFormData] = useState<Step2FormData>({
    employmentStatus: '',
    occupation: '',
    employer: '',
    income: '',
    accountType: '',
    initialDeposit: '',
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface FormErrors {
    employmentStatus?: string;
    income?: string;
    accountType?: string;
    initialDeposit?: string;
    termsAccepted?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
    if (!formData.income) newErrors.income = 'Income is required';
    if (!formData.accountType) newErrors.accountType = 'Account type is required';
    if (!formData.initialDeposit) newErrors.initialDeposit = 'Initial deposit is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      if (validateForm()) {
        // Store form data in local storage for persistence between steps
        localStorage.setItem('accountOpeningStep2Data', JSON.stringify(formData));
        router.push('/account/open/step3');
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Account Details | Account Opening</title>
        <meta name="description" content="Provide your account details and preferences to open a new bank account with AsabaBank." />
      </Head>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Account Details</h1>
            <p className="text-xl text-gray-600">
              Step 2 of 4 - Please provide your account preferences
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Employment Info */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, employmentStatus: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.employmentStatus ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Employment Status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                </select>
                {errors.employmentStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentStatus}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer</label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={(e) => setFormData(prev => ({ ...prev, employer: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, income: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.income ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="$5,000"
                />
                {errors.income && (
                  <p className="text-red-500 text-sm mt-1">{errors.income}</p>
                )}
              </div>

              {/* Account Preferences */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.accountType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Account Type</option>
                  <option value="checking">Checking Account</option>
                  <option value="savings">Savings Account</option>
                  <option value="money-market">Money Market Account</option>
                </select>
                {errors.accountType && (
                  <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Deposit</label>
                <input
                  type="number"
                  name="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, initialDeposit: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.initialDeposit ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="$100"
                />
                {errors.initialDeposit && (
                  <p className="text-red-500 text-sm mt-1">{errors.initialDeposit}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                        I agree to the Terms and Conditions
                      </label>
                    </div>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center">
                  <Link href="/account/open/step1" legacyBehavior>
                    <a className="text-indigo-600 hover:text-indigo-700">
                      ← Back to Previous Step
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Continue to Next Step →
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
