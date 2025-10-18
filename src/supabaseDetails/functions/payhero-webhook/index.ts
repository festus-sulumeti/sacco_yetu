import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('Received PayHero webhook:', payload);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // PayHero webhook payload structure
    const {
      transaction_reference,
      external_reference,
      amount,
      status,
      provider,
      phone_number
    } = payload;

    // Update contribution or loan repayment based on external_reference
    if (external_reference.startsWith('contribution_')) {
      const contributionId = external_reference.replace('contribution_', '');
      
      const { error } = await supabaseClient
        .from('contributions')
        .update({
          status: status === 'SUCCESS' ? 'completed' : 'failed',
          payhero_transaction_id: transaction_reference
        })
        .eq('id', contributionId);

      if (error) {
        console.error('Error updating contribution:', error);
        throw error;
      }

      console.log('Updated contribution:', contributionId);
    } else if (external_reference.startsWith('loan_repayment_')) {
      const repaymentId = external_reference.replace('loan_repayment_', '');
      
      const { error } = await supabaseClient
        .from('loan_repayments')
        .update({
          status: status === 'SUCCESS' ? 'completed' : 'failed',
          payhero_transaction_id: transaction_reference
        })
        .eq('id', repaymentId);

      if (error) {
        console.error('Error updating loan repayment:', error);
        throw error;
      }

      console.log('Updated loan repayment:', repaymentId);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in payhero-webhook function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
