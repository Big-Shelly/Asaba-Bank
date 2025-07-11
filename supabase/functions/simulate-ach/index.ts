import { supabase } from '../../../lib/supabaseClient';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate ACH delay by delaying crediting the deposit
// POST /functions/simulate-ach
export async function POST(req: Request) {
  const { user_id, amount } = await req.json();
  await delay(3000); // simulate 3 second delay
  await supabase.from('transactions').insert({ user_id, amount, type: 'deposit' });
  return new Response(JSON.stringify({ status: 'queued' }), { status: 200 });
}
