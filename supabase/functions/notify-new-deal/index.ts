import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, business_name, submitter_name, submitter_email } = await req.json();

    // Log the notification (in production, integrate with an email service)
    console.log("🔔 New deal submission received!");
    console.log(`Title: ${title}`);
    console.log(`Business: ${business_name}`);
    console.log(`Submitted by: ${submitter_name} (${submitter_email})`);
    console.log("Review it at: /admin");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification logged. Configure an email service for email delivery." 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to process notification" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
