import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import DepositModal from './DepositModal';

// Define interfaces (can be moved to a shared types.ts file)
interface User {
  id: string;
  email?: string;
}

interface AuthContext {
  user: User | null;
  isLoading: boolean;
}

interface Props {
  accountType: 'Checking' | 'Savings';
  userId: string;
  isAuthenticated: boolean;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: 'Checking' | 'Savings';
  userId: string;
  bankName: string;
  // Add other props as needed by DepositModal
}

export default function DepositSection({
  accountType,
  userId,
  isAuthenticated,
}: Props) {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: () => undefined,
        set: () => undefined,
        remove: () => undefined,
      },
    }
  );

  const { user } = useAuth() as AuthContext;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState<{
    accountName: string;
    accountNumber: string;
    routingNumber: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      setAccountDetails({
        accountName: 'Please log in to view account details',
        accountNumber: 'Account not found',
        routingNumber: 'Account not found',
      });
      return;
    }

    const fetchAccountDetails = async () => {
      setIsLoading(true);
      try {
        // Validate userId matches user.id
        if (user && user.id !== userId) {
          throw new Error('User ID mismatch');
        }

        // First try to get account info from database
        const { data: accountData, error: accountError } = await supabase
          .from('accounts')
          .select('balance, type, user_id')
          .eq('user_id', userId)
          .eq('type', accountType.toLowerCase())
          .maybeSingle();

        if (accountError) {
          console.error('Error fetching account details:', accountError);
          throw accountError;
        }

        // If account doesn't exist, create it
        if (!accountData) {
          // First check if we have any accounts for this user
          const { data: existingAccounts, error: accountsError } = await supabase
            .from('accounts')
            .select('type')
            .eq('user_id', userId);

          if (accountsError) {
            console.error('Error checking existing accounts:', accountsError);
            throw accountsError;
          }

          // Create both checking and savings accounts if none exist
          if (!existingAccounts?.length) {
            if (!user) {
              throw new Error('User not authenticated');
            }

            const { error: createError } = await supabase
              .from('accounts')
              .insert([
                {
                  user_id: user.id,
                  type: 'checking',
                  balance: 0,
                },
                {
                  user_id: user.id,
                  type: 'savings',
                  balance: 0,
                },
              ]);

            if (createError) {
              console.error('Error creating accounts:', createError);
              throw createError;
            }
          }

          // Try to fetch the account again
          const { data: newAccountData, error: newAccountError } = await supabase
            .from('accounts')
            .select('balance, type, user_id')
            .eq('user_id', userId)
            .eq('type', accountType.toLowerCase())
            .maybeSingle();

          if (newAccountError) {
            console.error('Error fetching newly created account:', newAccountError);
            throw newAccountError;
          }

          if (!newAccountData) {
            throw new Error(`Failed to create ${accountType.toLowerCase()} account`);
          }
        }

        // Get user's full name from profiles
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', userId)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }

        // Generate account information
        const accountInfo = {
          accountName: profileData?.full_name || 'Account not found',
          accountNumber: generateAccountNumber(accountType),
          routingNumber: accountType === 'Checking' ? '123456789' : '987654321',
        };

        setAccountDetails(accountInfo);
      } catch (error) {
        console.error('Error fetching account details:', error);
        if (error instanceof Error && error.message === 'User not authenticated') {
          setAccountDetails({
            accountName: 'Please log in to view account details',
            accountNumber: 'Account not found',
            routingNumber: 'Account not found',
          });
        } else {
          setAccountDetails({
            accountName: 'Account not found',
            accountNumber: 'Account not found',
            routingNumber: 'Account not found',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountDetails();
  }, [accountType, userId, isAuthenticated, user, supabase]);

  const generateAccountNumber = (type: 'Checking' | 'Savings'): string => {
    const prefix = type === 'Checking' ? '1' : '2';
    const randomDigits = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, '0');
    return `${prefix}${randomDigits}`;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading account details...</div>;
  }

  if (!accountDetails) {
    return (
      <div className="text-center py-4 text-red-500">
        Failed to load account details
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-2">
          {accountType === 'Checking' ? (
            <span className="text-green-500">🌱</span>
          ) : (
            <span className="text-blue-500">🌳</span>
          )}
          <h2 className="text-xl font-bold">
            {accountType === 'Checking' ? 'Life Green Checking' : 'BigTree Savings'}
          </h2>
        </div>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600">
            Account Name: {accountDetails?.accountName || 'Account not found'}
          </p>
          <p className="text-sm text-gray-600">
            Account Number: {accountDetails?.accountNumber || 'Account not found'}
          </p>
          <p className="text-sm text-gray-600">
            Routing Number: {accountDetails?.routingNumber || 'Account not found'}
          </p>
          <p className="text-sm text-gray-600">Bank Name: Asaba Bank</p>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full px-6 py-4 rounded-lg ${
          accountType === 'Checking'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">Deposit Funds</span>
            <p className="text-sm text-gray-200">Click to deposit</p>
          </div>
          <span className="text-2xl">→</span>
        </div>
      </button>

      <DepositModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accountType={accountType}
        userId={userId}
        bankName="Asaba Bank"
      />
    </div>
  );
}
