import Head from 'next/head';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AccountOpeningData {
  step1: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    ssn: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  step2: {
    employmentStatus: string;
    income: string;
    accountType: string;
    initialDeposit: string;
    termsAccepted: boolean;
  };
  step3: {
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
  };
}

export default function AccountOpeningStep4() {
  const router = useRouter();

  useEffect(() => {
    // Retrieve data from localStorage
    const step1Data = JSON.parse(localStorage.getItem('accountOpeningStep1Data') || '{}');
    const step2Data = JSON.parse(localStorage.getItem('accountOpeningStep2Data') || '{}');
    const step3Data = JSON.parse(localStorage.getItem('accountOpeningStep3Data') || '{}');

    // Here you would typically submit all the data to your backend API
    console.log('Submitting account opening data:', {
      step1: step1Data,
      step2: step2Data,
      step3: step3Data,
    });

    // Clear localStorage after successful submission
    localStorage.removeItem('accountOpeningStep1Data');
    localStorage.removeItem('accountOpeningStep2Data');
    localStorage.removeItem('accountOpeningStep3Data');

    // Redirect to confirmation page
    router.push('/account/open/confirmation');
  }, []);

  return (
    <Layout>
      <Head>
        <title>Account Opening - Finalizing</title>
        <meta name="description" content="Finalizing your account opening process" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Finalizing Your Application</h1>
        <p className="text-gray-600 mb-8">
          Your account is being created. This may take a moment...
        </p>

        <div className="animate-pulse">
          <div className="bg-indigo-100 p-4 rounded-lg mb-4">
            <div className="h-4 bg-indigo-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-indigo-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-indigo-200 rounded w-1/2 mb-2"></div>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <div className="h-4 bg-indigo-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-indigo-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-indigo-200 rounded w-1/2 mb-2"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
