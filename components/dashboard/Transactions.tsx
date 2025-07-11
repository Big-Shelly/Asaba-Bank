import React, { useState, useMemo } from 'react';

interface Transaction {
  id: string;
  amount: number | string;
  bank_name: string;
  routing_number: string;
  account_number: string;
  method: string;
  status: string;
  created_at?: string;
  withdrawal_count?: number;
}

interface Props {
  transactions: Transaction[];
}

const ITEMS_PER_PAGE = 5;

export default function Transactions({ transactions }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) =>
        (tx.bank_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         tx.account_number?.includes(searchTerm))
      )
      .filter((tx) =>
        statusFilter === 'all' ? true : tx.status === statusFilter
      );
  }, [transactions, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginated = filteredTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePrev = () => page > 1 && setPage(page - 1);

  if (!transactions || transactions.length === 0) {
    return <div className="p-4 text-center text-gray-600">No transactions found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">Recent Transactions</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by bank or account number"
          className="p-2 border rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="p-2 border rounded w-full sm:w-1/3"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {paginated.map((tx) => (
          <div
            key={tx.id}
            className="p-4 border border-gray-200 rounded-lg shadow bg-white"
          >
            <p>
              <strong>Amount:</strong>{' '}
              {typeof tx.amount === 'number'
                ? `$${tx.amount.toFixed(2)}`
                : !isNaN(parseFloat(tx.amount))
                ? `$${parseFloat(tx.amount).toFixed(2)}`
                : 'Unknown'}
            </p>
            <p><strong>Bank:</strong> {tx.bank_name || 'N/A'}</p>
            <p><strong>Routing Number:</strong> {tx.routing_number || 'N/A'}</p>
            <p><strong>Account Number:</strong> {tx.account_number || 'N/A'}</p>
            <p><strong>Method:</strong> {tx.method || 'N/A'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`inline-block px-2 py-1 rounded text-sm ${
                  tx.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : tx.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {tx.status}
              </span>
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {tx.created_at
                ? new Date(tx.created_at).toLocaleString()
                : 'Unknown'}
            </p>
            {typeof tx.withdrawal_count === 'number' && (
              <p><strong>Withdrawal Count:</strong> {tx.withdrawal_count}</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
