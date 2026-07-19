import type { VercelRequest, VercelResponse } from "@vercel/node";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      name,
      businessName,
      phone,
      email,
      city,
      serviceNeeded,
      message,
      website_honey,
    } = req.body ?? {};

    // Honeypot spam protection
    if (website_honey) {
      return res.status(200).json({ success: true });
    }

    if (
      !name ||
      !businessName ||
      !phone ||
      !email ||
      !city ||
      !serviceNeeded
    ) {
      return res.status(400).json({
        error: "Please complete all required fields.",
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !contactEmail) {
      console.error(
        "RESEND_API_KEY or CONTACT_EMAIL is not configured."
      );

      return res.status(500).json({
        error: "Email service is not configured.",
      });
    }

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM ||
            "Kshitij Website <onboarding@resend.dev>",
          to: [contactEmail],
          reply_to: email,
          subject: `New Website Enquiry — ${businessName}`,
          html: `
            <h2>New Website Enquiry</h2>

            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Business:</strong> ${escapeHtml(
              businessName
            )}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>City:</strong> ${escapeHtml(city)}</p>
            <p><strong>Service:</strong> ${escapeHtml(
              serviceNeeded
            )}</p>

            <h3>Message</h3>
            <p>${escapeHtml(
              message || "No additional message provided."
            )}</p>
          `,
        }),
      }
    );

    if (!resendResponse.ok) {
      const errorDetails = await resendResponse.text();
      console.error("Resend API error:", errorDetails);

      return res.status(502).json({
        error: "The enquiry could not be emailed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been submitted.",
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);

    return res.status(500).json({
      error: "An unexpected error occurred.",
    });
  }
}
