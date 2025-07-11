import React from 'react';
import { jsPDF } from 'jspdf';

interface DepositInfoProps {
  accountType: 'Checking' | 'Savings';
  accountNumber: string;
  accountName: string;
  email?: string;
}

const DepositInfo: React.FC<DepositInfoProps> = ({ accountType, accountNumber, accountName, email }) => {
  const routingNumber = accountType === 'Checking' ? '011000015' : '021000021';
  const bankName = 'Asaba Bank N.A.';
  const bankAddress = '123 Financial Plaza, New York, NY 10001';
  const swiftCode = 'ASBNUS33';

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Deposit Instructions for ${accountType} Account`, 10, 10);
    doc.text(`Account Name: ${accountName}`, 10, 20);
    doc.text(`Account Number: ${accountNumber}`, 10, 30);
    doc.text(`Routing Number: ${routingNumber}`, 10, 40);
    doc.text(`Bank Name: ${bankName}`, 10, 50);
    doc.text(`Bank Address: ${bankAddress}`, 10, 60);
    doc.text(`SWIFT Code: ${swiftCode}`, 10, 70);
    doc.save(`${accountType}_deposit_info.pdf`);
  };

  const handleEmail = () => {
    if (!email) return alert('No email provided');
    alert(`Deposit instructions sent to ${email}. (Email integration needed)`);
  };

  return (
    <div className="border rounded-md bg-white p-5 shadow print:p-0">
      <div className="mb-4">
        <img src="/logo.png" alt="Asaba Bank" className="h-10 mb-2" />
        <h3 className="text-lg font-bold text-indigo-700">
          {accountType} Deposit Instructions
        </h3>
      </div>

      <div className="mb-6">
        <p className="font-medium mb-2">Direct Deposit / ACH:</p>
        <ul className="text-sm space-y-1 text-gray-700">
          <li><strong>Account Name:</strong> {accountName}</li>
          <li><strong>Account Number:</strong> {accountNumber}</li>
          <li><strong>Routing Number:</strong> {routingNumber}</li>
          <li><strong>Bank Name:</strong> {bankName}</li>
          <li><strong>Bank Address:</strong> {bankAddress}</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3 italic">
          ✅ Checks are cleared daily. Direct deposits arrive 2 days early.
        </p>
      </div>

      <div className="mb-6">
        <p className="font-medium mb-2">Wire Transfer Instructions:</p>
        <ul className="text-sm space-y-1 text-gray-700">
          <li><strong>SWIFT Code:</strong> {swiftCode}</li>
          <li><strong>Account Name:</strong> {accountName}</li>
          <li><strong>Account Number:</strong> {accountNumber}</li>
          <li><strong>Routing Number:</strong> {routingNumber}</li>
          <li><strong>Bank Name:</strong> {bankName}</li>
          <li><strong>Bank Address:</strong> {bankAddress}</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3 italic">
          💡 International wires must include the SWIFT code.
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
        {email && (
          <button
            onClick={handleEmail}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Email
          </button>
        )}
      </div>
    </div>
  );
};

export default DepositInfo;
