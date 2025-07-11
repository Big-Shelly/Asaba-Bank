interface AccountCardProps {
  type: 'Checking' | 'Savings';
  number: string;
  balance: number;
  onClick?: () => void;
  className?: string;
}

export default function AccountCard({ type, number, balance, onClick, className }: AccountCardProps) {
  const formattedBalance = balance.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow p-6 ring-1 ring-indigo-100 cursor-pointer hover:ring-indigo-200 transition-all duration-200 ${className || ''}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <h3 className="text-lg font-semibold text-indigo-700">{type} Account</h3>
      <p className="text-sm text-gray-500">Account Number: {number}</p>
      <p className="mt-2 text-2xl font-bold text-indigo-800">
        {formattedBalance}
      </p>
    </div>
  );
}
