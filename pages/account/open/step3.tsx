import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';

// Interface for the form data remains the same
interface Step3FormData {
  identification: {
    idType: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
    issuingState: string;
  };
  employment: {
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employmentStartDate: string;
    supervisorName: string;
    supervisorEmail: string;
    supervisorPhone: string;
  };
  creditHistory: {
    currentCreditScore: number;
    monthlyDebtPayments: number;
    monthlyHousingExpense: number;
    monthlyIncome: number;
    hasBankruptcy: boolean;
    hasForeclosure: boolean;
    hasTaxLien: boolean;
  };
  securityQuestions: {
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
  };
  contactPreferences: {
    emailUpdates: boolean;
    textUpdates: boolean;
    phoneUpdates: boolean;
  };
}

// Define the shape of the errors object for type safety
type FormErrors = {
  [K in keyof Step3FormData]?: {
    [P in keyof Step3FormData[K]]?: string;
  };
};


const Step3: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Step3FormData>({
    identification: { idType: '', idNumber: '', issueDate: '', expiryDate: '', issuingState: '' },
    employment: { employerName: '', employerAddress: '', jobTitle: '', employmentStartDate: '', supervisorName: '', supervisorEmail: '', supervisorPhone: '' },
    creditHistory: { currentCreditScore: 0, monthlyDebtPayments: 0, monthlyHousingExpense: 0, monthlyIncome: 0, hasBankruptcy: false, hasForeclosure: false, hasTaxLien: false },
    securityQuestions: { question1: '', answer1: '', question2: '', answer2: '' },
    contactPreferences: { emailUpdates: false, textUpdates: false, phoneUpdates: false },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // FIXED: A single, robust handler for all input types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.') as [keyof Step3FormData, string];

    const isBooleanField = 'checked' in e.target ? e.target.checked : (field.startsWith('has') || section === 'contactPreferences');
    const isNumericField = e.target.type === 'number';
    
    let processedValue: string | number | boolean = value;
    if (isBooleanField) {
        processedValue = value === 'true';
    } else if (isNumericField) {
        processedValue = parseInt(value, 10) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: processedValue,
      },
    }));

    // Clear the error for the field when the user starts typing
    if (errors[section]?.[field as keyof typeof errors[typeof section]]) {
        setErrors(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: '',
            }
        }));
    }
  };

  // FIXED: Simplified and corrected validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Helper to set errors and update validity
    const setError = (section: keyof Step3FormData, field: string, message: string) => {
        if (!newErrors[section]) {
            newErrors[section] = {};
        }
        (newErrors[section] as any)[field] = message;
        isValid = false;
    };
    
    for (const sectionKey in formData) {
        const section = sectionKey as keyof Step3FormData;
        for (const fieldKey in formData[section]) {
            const field = fieldKey as keyof Step3FormData[typeof section];
            const value = formData[section][field];

            // Skip validation for non-required boolean fields
            if (typeof value === 'boolean' || section === 'contactPreferences') continue;

            if (value === '' || (typeof value === 'number' && value <= 0)) {
                setError(section, field, 'This field is required.');
            }
        }
    }
    
    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
        setIsSubmitting(false);
        return;
    }

    setIsSubmitting(true);
    // Store data in localStorage
    localStorage.setItem('accountOpeningStep3Data', JSON.stringify(formData));

    // Navigate to next step
    router.push('/account/open/step4');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Step 3: Additional Information</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Identification Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Identification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                <select
                  name="identification.idType"
                  value={formData.identification.idType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select ID Type</option>
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="national_id">National ID</option>
                </select>
                {errors.identification?.idType && (
                  <p className="text-red-500 text-sm mt-1">{errors.identification.idType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <input
                  type="text"
                  name="identification.idNumber"
                  value={formData.identification.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.identification?.idNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.identification.idNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input
                  type="date"
                  name="identification.issueDate"
                  value={formData.identification.issueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.identification?.issueDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.identification.issueDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  name="identification.expiryDate"
                  value={formData.identification.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.identification?.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.identification.expiryDate}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing State</label>
                <input
                  type="text"
                  name="identification.issuingState"
                  value={formData.identification.issuingState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.identification?.issuingState && (
                  <p className="text-red-500 text-sm mt-1">{errors.identification.issuingState}</p>
                )}
              </div>
            </div>
          </div>

          {/* Employment Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Employment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer Name</label>
                <input
                  type="text"
                  name="employment.employerName"
                  value={formData.employment.employerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.employerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.employerName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer Address</label>
                <input
                  type="text"
                  name="employment.employerAddress"
                  value={formData.employment.employerAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.employerAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.employerAddress}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="employment.jobTitle"
                  value={formData.employment.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.jobTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.jobTitle}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Start Date</label>
                <input
                  type="date"
                  name="employment.employmentStartDate"
                  value={formData.employment.employmentStartDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.employmentStartDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.employmentStartDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Name</label>
                <input
                  type="text"
                  name="employment.supervisorName"
                  value={formData.employment.supervisorName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.supervisorName && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.supervisorName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Email</label>
                <input
                  type="email"
                  name="employment.supervisorEmail"
                  value={formData.employment.supervisorEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.supervisorEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.supervisorEmail}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Phone</label>
                <input
                  type="tel"
                  name="employment.supervisorPhone"
                  value={formData.employment.supervisorPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.employment?.supervisorPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.supervisorPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Credit History Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Credit History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Credit Score</label>
                <input
                  type="number"
                  name="creditHistory.currentCreditScore"
                  value={formData.creditHistory.currentCreditScore}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.creditHistory?.currentCreditScore && (
                  <p className="text-red-500 text-sm mt-1">{errors.creditHistory.currentCreditScore}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Debt Payments</label>
                <input
                  type="number"
                  name="creditHistory.monthlyDebtPayments"
                  value={formData.creditHistory.monthlyDebtPayments}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.creditHistory?.monthlyDebtPayments && (
                  <p className="text-red-500 text-sm mt-1">{errors.creditHistory.monthlyDebtPayments}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Housing Expense</label>
                <input
                  type="number"
                  name="creditHistory.monthlyHousingExpense"
                  value={formData.creditHistory.monthlyHousingExpense}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.creditHistory?.monthlyHousingExpense && (
                  <p className="text-red-500 text-sm mt-1">{errors.creditHistory.monthlyHousingExpense}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
                <input
                  type="number"
                  name="creditHistory.monthlyIncome"
                  value={formData.creditHistory.monthlyIncome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.creditHistory?.monthlyIncome && (
                  <p className="text-red-500 text-sm mt-1">{errors.creditHistory.monthlyIncome}</p>
                )}
              </div>
              <div className="col-span-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Have you ever filed for bankruptcy?</label>
                    <select
                      name="creditHistory.hasBankruptcy"
                      value={formData.creditHistory.hasBankruptcy.toString()}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Have you ever had a foreclosure?</label>
                    <select
                      name="creditHistory.hasForeclosure"
                      value={formData.creditHistory.hasForeclosure.toString()}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Have you ever had a tax lien?</label>
                    <select
                      name="creditHistory.hasTaxLien"
                      value={formData.creditHistory.hasTaxLien.toString()}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Questions Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Security Questions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question 1</label>
                <input
                  type="text"
                  name="securityQuestions.question1"
                  value={formData.securityQuestions.question1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.securityQuestions?.question1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.securityQuestions.question1}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer 1</label>
                <input
                  type="text"
                  name="securityQuestions.answer1"
                  value={formData.securityQuestions.answer1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.securityQuestions?.answer1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.securityQuestions.answer1}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question 2</label>
                <input
                  type="text"
                  name="securityQuestions.question2"
                  value={formData.securityQuestions.question2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.securityQuestions?.question2 && (
                  <p className="text-red-500 text-sm mt-1">{errors.securityQuestions.question2}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer 2</label>
                <input
                  type="text"
                  name="securityQuestions.answer2"
                  value={formData.securityQuestions.answer2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.securityQuestions?.answer2 && (
                  <p className="text-red-500 text-sm mt-1">{errors.securityQuestions.answer2}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Preferences Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Updates</label>
                <select
                  name="contactPreferences.emailUpdates"
                  value={formData.contactPreferences.emailUpdates.toString()}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Updates</label>
                <select
                  name="contactPreferences.textUpdates"
                  value={formData.contactPreferences.textUpdates.toString()}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Updates</label>
                <select
                  name="contactPreferences.phoneUpdates"
                  value={formData.contactPreferences.phoneUpdates.toString()}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/account/open/step2" className="text-blue-500 hover:text-blue-700">Previous</Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Step3;