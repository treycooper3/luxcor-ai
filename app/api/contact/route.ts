import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot: if a bot filled the hidden website_url field, fake success
    // without forwarding the submission.
    if (body.website_url) {
      return NextResponse.json({
        success: true,
        lead_id: "LUXCOR-" + Date.now(),
        message: "Lead captured successfully",
      });
    }

    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the n8n webhook URL from environment
    const n8nWebhookUrl = process.env.N8N_LUXCOR_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      console.error("N8N_LUXCOR_WEBHOOK_URL not configured");
      return NextResponse.json(
        { error: "Form submission not configured" },
        { status: 500 }
      );
    }

    // Forward to n8n webhook
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed: ${n8nResponse.status}`);
    }

    const n8nResult = await n8nResponse.json();

    return NextResponse.json({
      success: true,
      lead_id: n8nResult.lead_id || "LUXCOR-" + Date.now(),
      message: "Lead captured successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
