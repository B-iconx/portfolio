import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create beautiful HTML email template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 0;">
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                        📬 New Contact Form 
                      </h1>
                      <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                        From B-iconx Portfolio Website
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <!-- Alert Banner -->
                    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                      <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                        ⚡ New client inquiry received!
                      </p>
                    </div>

                    <!-- Client Information -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="width: 120px; vertical-align: top;">
                                <strong style="color: #374151; font-size: 14px;">👤 Name:</strong>
                              </td>
                              <td style="vertical-align: top;">
                                <span style="color: #1f2937; font-size: 16px; font-weight: 600;">
                                  ${name}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="width: 120px; vertical-align: top;">
                                <strong style="color: #374151; font-size: 14px;">📧 Email:</strong>
                              </td>
                              <td style="vertical-align: top;">
                                <a href="mailto:${email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">
                                  ${email}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${phone ? `
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="width: 120px; vertical-align: top;">
                                <strong style="color: #374151; font-size: 14px;">📱 Phone:</strong>
                              </td>
                              <td style="vertical-align: top;">
                                <a href="tel:${phone}" style="color: #2563eb; font-size: 14px; text-decoration: none;">
                                  ${phone}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}

                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="width: 120px; vertical-align: top;">
                                <strong style="color: #374151; font-size: 14px;">📝 Subject:</strong>
                              </td>
                              <td style="vertical-align: top;">
                                <span style="color: #1f2937; font-size: 14px; font-weight: 600;">
                                  ${subject}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 20px 0;">
                          <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 10px;">
                            💬 Message:
                          </strong>
                          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #f97316;">
                            <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                            ${message}
                            </p>
                          </div>
                        </td>
                      </tr>

                    </table>

                    <!-- Quick Actions -->
                    <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px; text-align: center;">
                      <p style="margin: 0 0 15px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                        Quick Actions
                      </p>
                      <a href="mailto:${email}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; margin: 5px;">
                        Reply via Email
                      </a>
                      ${phone ? `
                      <a href="tel:${phone}" style="display: inline-block; background-color: #1e40af; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; margin: 5px;">
                        Call Client
                      </a>
                      ` : ''}
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-align: center;">
                      This email was sent from your B-iconx Portfolio website contact form
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 11px; text-align: center;">
                      © ${new Date().getFullYear()} B-iconx Portfolio. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    // Plain text version (fallback)
    const textContent = `
New Contact Form Submission from B-iconx Portfolio Website

Name: ${name} 
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}

---
Reply to this email to respond to the client.
    `;

    // Send email using Resend
  const data = await resend.emails.send({
  from: 'B-iconx Portfolio <onboarding@resend.dev>', // ✅ temporary sender
  to: ['calvinbenard28@gmail.com'],
  replyTo: email,
  subject: `🎨 New Inquiry: ${subject}`,
  html: htmlContent,
  text: textContent,
});

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email' 
    });
  }
}

