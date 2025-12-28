const API_BASE_URL = process.env.ZOHO_ACCOUNTS_URL || "http://localhost:3000/api/zoho-token";

async function getAccessToken() {
  const res = await fetch(API_BASE_URL, { method: 'GET' });
  const data = await res.json();
  return data.access_token;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Handle preflight
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    const accessToken = await getAccessToken();

    // Send to Zoho CRM Leads
    const response = await fetch("https://www.zohoapis.in/crm/v2/Leads", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: name || "Unknown",
            Email: email,
            Phone: phone,
            Description: `Subject: ${subject || ''}\nMessage: ${message || ''}`,
            Company: "Individual",
          },
        ],
      }),
    });
    const zohoData = await response.json();

    // Push event to GTM dataLayer (client-only, so will be ignored server-side)
    // The server route should not reference `window` during execution.

    console.log("Zoho Lead:", zohoData);
    return new Response(
      JSON.stringify({ success: true, zoho: zohoData }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders() } }
    );
  }
}
