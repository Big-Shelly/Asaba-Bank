import Head from 'next/head';
import Layout from '@/components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

interface FormData {
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
}

// Add type definitions for the form data
const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  ssn: '',
  dateOfBirth: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export default function AccountOpeningStep1() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.ssn) newErrors.ssn = 'SSN is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submission triggered');
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      if (validateForm()) {
        // Store form data in local storage for persistence between steps
        localStorage.setItem('accountOpeningStep1Data', JSON.stringify(formData));
        // Navigate to step2 without passing data in query parameters
        router.push('/account/open/step2');
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
        <title>Personal Information | Account Opening</title>
        <meta name="description" content="Provide your personal information to open a new bank account with AsabaBank." />
      </Head>

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" id="account-opening-form">
          {/* Personal Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Identification */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Number</label>
            <input
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={(e) => setFormData(prev => ({ ...prev, ssn: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.ssn ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="XXX-XX-XXXX"
            />
            {errors.ssn && (
              <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select State</option>
              <option value="NY">New York</option>
              <option value="NJ">New Jersey</option>
              <option value="CT">Connecticut</option>
              <option value="PA">Pennsylvania</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center">
              <Link href="/account/open" legacyBehavior>
                <a className="text-indigo-600 hover:text-indigo-700">
                  ← Back to Requirements
                </a>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-indigo-600 text-white px-8 py-3 rounded-lg transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                }`}
                form="account-opening-form"
              >
                {isSubmitting ? 'Submitting...' : 'Continue to Next Step →'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
