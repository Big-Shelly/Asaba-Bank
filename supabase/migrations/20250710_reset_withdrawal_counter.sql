-- Reset withdrawal counter for user with ID '97bd3390-aa8d-4fe5-aae0-0587d94df445'
UPDATE profiles
SET withdrawal_count = 0
WHERE id = '97bd3390-aa8d-4fe5-aae0-0587d94df445';

-- Verify the update
SELECT withdrawal_count FROM profiles WHERE id = '97bd3390-aa8d-4fe5-aae0-0587d94df445';
