-- Check the profiles table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles';

-- Check all data in profiles table
SELECT * FROM profiles;

-- Check if withdrawal_count column exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name = 'withdrawal_count';

-- If withdrawal_count doesn't exist, create it
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS withdrawal_count INTEGER DEFAULT 0;

-- Reset withdrawal counter for all users
UPDATE profiles 
SET withdrawal_count = 0;

-- Verify the update
SELECT id, withdrawal_count FROM profiles;
