-- Create accounts table if it doesn't exist
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    account_type TEXT NOT NULL CHECK (account_type IN ('checking', 'savings')),
    account_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    routing_number TEXT NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'frozen')),
    currency TEXT NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_account UNIQUE (user_id, account_type)
);

-- Create function to generate account numbers
CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS TEXT AS $$
DECLARE
    account_number TEXT;
BEGIN
    -- Generate a 12-digit account number with prefix
    account_number := '123456789' || LPAD(CAST(FLOOR(RANDOM() * 999999) AS TEXT), 6, '0');
    RETURN account_number;
END;
$$ LANGUAGE plpgsql;

-- Function to get routing number based on account type
CREATE OR REPLACE FUNCTION get_routing_number(account_type TEXT)
RETURNS TEXT AS $$
BEGIN
    CASE 
        WHEN account_type = 'checking' THEN RETURN '123456789';
        WHEN account_type = 'savings' THEN RETURN '987654321';
        ELSE RETURN '123456789';
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- Create function to create accounts
CREATE OR REPLACE FUNCTION create_user_accounts()
RETURNS TRIGGER AS $$
DECLARE
    checking_routing TEXT;
    savings_routing TEXT;
BEGIN
    -- Get routing numbers based on account type
    checking_routing := get_routing_number('checking');
    savings_routing := get_routing_number('savings');

    -- Insert checking account with welcome bonus
    INSERT INTO accounts (
        user_id, account_type, account_name, account_number, 
        routing_number, balance, status, currency
    ) VALUES (
        NEW.id,
        'checking',
        'Life Green Checking',
        generate_account_number(),
        checking_routing,
        100.00,  -- Welcome bonus
        'active',
        'USD'
    );

    -- Insert savings account with welcome bonus
    INSERT INTO accounts (
        user_id, account_type, account_name, account_number, 
        routing_number, balance, status, currency
    ) VALUES (
        NEW.id,
        'savings',
        'BigTree Savings',
        generate_account_number(),
        savings_routing,
        50.00,  -- Welcome bonus
        'active',
        'USD'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create accounts when a new user is registered
CREATE TRIGGER create_user_accounts_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_accounts();

-- Update timestamp on accounts table
CREATE OR REPLACE FUNCTION update_accounts_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_accounts_timestamp
    BEFORE UPDATE ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_accounts_timestamp();
