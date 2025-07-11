-- Add account name field if it doesn't exist
ALTER TABLE accounts 
ADD COLUMN IF NOT EXISTS account_name VARCHAR(255) DEFAULT '';

-- Add account number field if it doesn't exist
ALTER TABLE accounts 
ADD COLUMN IF NOT EXISTS account_number VARCHAR(255) DEFAULT '';

-- Add routing number field if it doesn't exist
ALTER TABLE accounts 
ADD COLUMN IF NOT EXISTS routing_number VARCHAR(255) DEFAULT '';

-- Add status field if it doesn't exist
ALTER TABLE accounts 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Update existing records with real values
UPDATE accounts 
SET 
    account_name = (SELECT full_name FROM profiles WHERE profiles.id = accounts.user_id),
    account_number = (SELECT 
        CASE 
            WHEN type = 'checking' THEN 
                CONCAT(
                    '1',  -- First digit for checking accounts
                    LPAD(CAST((RANDOM() * 999999999) + 1 AS TEXT), 9, '0')  -- 9 random digits
                )
            WHEN type = 'savings' THEN 
                CONCAT(
                    '2',  -- First digit for savings accounts
                    LPAD(CAST((RANDOM() * 999999999) + 1 AS TEXT), 9, '0')  -- 9 random digits
                )
            ELSE ''
        END
    ),
    routing_number = CASE 
        WHEN type = 'checking' THEN '123456789'
        WHEN type = 'savings' THEN '987654321'
        ELSE ''
    END,
    status = 'active';

-- Verify the update
SELECT id, type, account_name, account_number, routing_number FROM accounts;
