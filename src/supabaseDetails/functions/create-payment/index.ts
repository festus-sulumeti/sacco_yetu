import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  amount: number;
  phone_number: string;
  channel_id: number;
  provider: string;
  external_reference: string;
  callback_url: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, phone_number, channel_id, provider, external_reference, callback_url } = await req.json();

    console.log('Creating PayHero payment:', { amount, phone_number, external_reference });

    const username = Deno.env.get('PAYHERO_API_USERNAME');
    const password = Deno.env.get('PAYHERO_API_PASSWORD');

    if (!username || !password) {
      throw new Error('PayHero credentials not configured');
    }

    const credentials = btoa(`${username}:${password}`);

    const paymentData: PaymentRequest = {
      amount,
      phone_number,
      channel_id,
      provider,
      external_reference,
      callback_url
    };

    console.log('Sending payment request to PayHero:', paymentData);

    const response = await fetch('https://backend.payhero.co.ke/api/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const responseData = await response.json();
    console.log('PayHero response:', responseData);

    if (!response.ok) {
      throw new Error(`PayHero API error: ${JSON.stringify(responseData)}`);
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in create-payment function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
