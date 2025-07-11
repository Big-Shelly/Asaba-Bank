interface TransactionItemProps {
  id: string;
  description: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
  date: string;
  accountType: 'Checking' | 'Savings';
}

export default function TransactionItem({ description, type, amount, date, accountType }: TransactionItemProps) {
  const amountColor = type === 'CREDIT' ? 'text-green-600' : 'text-red-600';

  return (
    <li className="flex justify-between items-center border-b border-gray-200 pb-2">
      <div>
        <p className="font-semibold">{description}</p>
        <p className="text-sm text-gray-600">
          {date} &middot; <span className="italic">{accountType} Account</span>
        </p>
      </div>
      <p className={`font-bold ${amountColor}`}>
        {amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `$${amount.toFixed(2)}`}
      </p>
    </li>
  );
}
