import { Resend } from "resend";
import { ENV } from "./_core/env";

const FROM_ADDRESS = "Render King <noreply@renderking.au>";
const TO_ADDRESS = "projects@renderking.au";

function getResend(): Resend {
  if (!ENV.resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(ENV.resendApiKey);
}

// ─── Contact Form Email ───────────────────────────────────────────────────────
export interface ContactEmailInput {
  name: string;
  company?: string;
  phone: string;
  email: string;
  message: string;
}

export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const resend = getResend();
  const subject = `Website Enquiry — ${input.company || input.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f2f2f2; padding: 32px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #c9a84c; font-size: 20px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">Render King</h1>
        <p style="color: #888; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 0.08em;">New Website Enquiry</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 120px;">Name</td><td style="padding: 8px 0; color: #f2f2f2; font-size: 14px;">${input.name}</td></tr>
        ${input.company ? `<tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Company</td><td style="padding: 8px 0; color: #f2f2f2; font-size: 14px;">${input.company}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Phone</td><td style="padding: 8px 0; color: #f2f2f2; font-size: 14px;"><a href="tel:${input.phone}" style="color: #c9a84c;">${input.phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td><td style="padding: 8px 0; color: #f2f2f2; font-size: 14px;"><a href="mailto:${input.email}" style="color: #c9a84c;">${input.email}</a></td></tr>
      </table>
      <div style="background: #1a1a1a; border-left: 3px solid #c9a84c; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">Message</p>
        <p style="color: #f2f2f2; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${input.message}</p>
      </div>
      <p style="color: #555; font-size: 11px; border-top: 1px solid #222; padding-top: 16px; margin: 0;">Submitted via renderking.au/contact</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: input.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

// ─── Builder Portal Project Submission Email ──────────────────────────────────
export interface ProjectEmailInput {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  builderType?: string;
  projectAddress: string;
  suburb: string;
  projectType?: string;
  services: string[];
  wallArea?: string;
  startDate?: string;
  notes?: string;
  fileNames?: string[];
  reference: string;
}

export async function sendProjectEmail(input: ProjectEmailInput): Promise<void> {
  const resend = getResend();
  const subject = `New Project Submission — ${input.companyName} | ${input.suburb} [${input.reference}]`;
  const fileList = input.fileNames && input.fileNames.length > 0
    ? input.fileNames.map((f) => `<li style="color: #f2f2f2; font-size: 13px; padding: 2px 0;">${f}</li>`).join("")
    : `<li style="color: #888; font-size: 13px;">No files attached — team to follow up</li>`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0f0f0f; color: #f2f2f2; padding: 32px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #c9a84c; font-size: 20px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">Render King</h1>
        <p style="color: #888; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 0.08em;">New Builder Portal Submission — ${input.reference}</p>
      </div>

      <h2 style="color: #c9a84c; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Builder / Client Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; width: 130px;">Company</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.companyName}</td></tr>
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Contact</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.contactName}</td></tr>
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Phone</td><td style="padding: 6px 0; font-size: 14px;"><a href="tel:${input.phone}" style="color: #c9a84c;">${input.phone}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Email</td><td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${input.email}" style="color: #c9a84c;">${input.email}</a></td></tr>
        ${input.builderType ? `<tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Builder Type</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.builderType}</td></tr>` : ""}
      </table>

      <h2 style="color: #c9a84c; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Project Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; width: 130px;">Address</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.projectAddress}</td></tr>
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Suburb</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.suburb}</td></tr>
        ${input.projectType ? `<tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Project Type</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.projectType}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Services</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.services.join(", ")}</td></tr>
        ${input.wallArea ? `<tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Wall Area</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.wallArea} m²</td></tr>` : ""}
        ${input.startDate ? `<tr><td style="padding: 6px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Start Date</td><td style="padding: 6px 0; color: #f2f2f2; font-size: 14px;">${input.startDate}</td></tr>` : ""}
      </table>

      ${input.notes ? `
      <div style="background: #1a1a1a; border-left: 3px solid #c9a84c; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">Notes</p>
        <p style="color: #f2f2f2; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${input.notes}</p>
      </div>` : ""}

      <h2 style="color: #c9a84c; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Attached Files (${input.fileNames?.length || 0})</h2>
      <ul style="margin: 0 0 24px; padding-left: 20px;">${fileList}</ul>

      <p style="color: #555; font-size: 11px; border-top: 1px solid #222; padding-top: 16px; margin: 0;">Submitted via renderking.au/submit-project · Ref: ${input.reference}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: input.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
