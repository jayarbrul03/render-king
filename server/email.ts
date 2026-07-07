import { Resend } from "resend";
import { ENV } from "./_core/env";
import { CONTACT_EMAIL } from "../shared/const";

const FROM_ADDRESS = "Render King <noreply@renderking.au>";
const TO_ADDRESS = CONTACT_EMAIL;

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

// ─── Blog Email Blast ─────────────────────────────────────────────────────────
export interface BlogBlastPost {
  id: number;
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  content: string;
  readTime: string;
}

export interface BlogBlastClient {
  id: number;
  name: string;
  email: string;
  company?: string | null;
}

export async function sendBlogBlast(
  post: BlogBlastPost,
  clients: BlogBlastClient[]
): Promise<{ sent: number; failed: number }> {
  const resend = getResend();
  let sent = 0;
  let failed = 0;

  // Strip markdown to a short preview (first ~300 chars of plain text)
  const plainPreview = post.content
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 300);

  const postUrl = `https://renderking.au/blog/${post.slug}`;

  for (const client of clients) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f2f2f2; padding: 32px; border-radius: 8px;">
        <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #c9a84c; font-size: 18px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">Render King</h1>
          <p style="color: #888; font-size: 11px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 0.08em;">${post.category} · ${post.readTime}</p>
        </div>
        <h2 style="color: #ffffff; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 16px; line-height: 1.2;">${post.title}</h2>
        <p style="color: #c9a84c; font-size: 14px; font-style: italic; margin: 0 0 20px; line-height: 1.6;">${post.metaDescription}</p>
        <p style="color: #d9d9d9; font-size: 14px; line-height: 1.7; margin: 0 0 28px;">${plainPreview}…</p>
        <a href="${postUrl}" style="display: inline-block; background: #c9a84c; color: #0f0f0f; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.14em; padding: 14px 32px; text-decoration: none;">Read Full Article →</a>
        <p style="color: #444; font-size: 11px; border-top: 1px solid #222; padding-top: 20px; margin: 32px 0 0;">
          Hi ${client.name}${client.company ? ` (${client.company})` : ""}, you're receiving this because you're a valued Render King client.<br/>
          <a href="mailto:${CONTACT_EMAIL}?subject=Unsubscribe" style="color: #666;">Unsubscribe</a>
        </p>
      </div>
    `;

    try {
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: client.email,
        subject: `${post.title} — Render King`,
        html,
      });
      if (error) {
        console.error(`[BlogBlast] Failed to send to ${client.email}:`, error);
        failed++;
      } else {
        sent++;
      }
    } catch (err) {
      console.error(`[BlogBlast] Exception sending to ${client.email}:`, err);
      failed++;
    }
  }

  return { sent, failed };
}

// ─── Owner notifications (blog cron, contact, project submissions) ─────────────
export interface OwnerNotificationInput {
  title: string;
  content: string;
}

export async function sendOwnerNotification(
  input: OwnerNotificationInput
): Promise<void> {
  const resend = getResend();
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f2f2f2; padding: 32px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #c9a84c; font-size: 18px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">Render King</h1>
        <p style="color: #888; font-size: 12px; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 0.08em;">Site Notification</p>
      </div>
      <h2 style="color: #f2f2f2; font-size: 16px; margin: 0 0 16px;">${input.title}</h2>
      <div style="background: #1a1a1a; border-left: 3px solid #c9a84c; padding: 16px; border-radius: 4px;">
        <p style="color: #f2f2f2; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${input.content}</p>
      </div>
      <p style="color: #555; font-size: 11px; border-top: 1px solid #222; padding-top: 16px; margin: 16px 0 0;">renderking.au automated notification</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: ENV.ownerEmail || TO_ADDRESS,
    subject: input.title,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
