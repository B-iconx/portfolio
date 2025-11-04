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
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0f1e;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #02071b; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 0;">
                    <div style="background: linear-gradient(135deg, #1a1f35 0%, #0a0f1e 100%); padding: 40px 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td>
                            <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                              <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #4b5563 0%, #1f2937 100%); display: flex; align-items: center; justify-content: center;">
                                <span style="color: #ffffff; font-size: 24px; font-weight: bold;">I</span>
                              </div>
                              <div>
                                <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">
                                  New Contact Inquiry
                                </h1>
                                <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 13px;">
                                  Portfolio Contact Form
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <!-- Alert Banner -->
                    <div style="background: rgba(255, 255, 255, 0.05); border-left: 3px solid #ffffff; padding: 16px 20px; margin-bottom: 32px; border-radius: 8px; backdrop-filter: blur(10px);">
                      <p style="margin: 0; color: #f3f4f6; font-size: 14px; font-weight: 500;">
                        ⚡ You have a new message from your portfolio website
                      </p>
                    </div>

                    <!-- Client Information -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      
                      <!-- Name -->
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 20px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                  <span style="color: #9ca3af; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Contact Name</span>
                                </div>
                              </td>
                              <td style="vertical-align: top;">
                                <span style="color: #f9fafb; font-size: 16px; font-weight: 600;">
                                  ${name}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Email -->
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 20px;">
                                <span style="color: #9ca3af; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</span>
                              </td>
                              <td style="vertical-align: top;">
                                <a href="mailto:${email}" style="color: #e5e7eb; font-size: 15px; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.2); transition: all 0.3s;">
                                  ${email}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Phone (conditional) -->
                      ${phone ? `
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 20px;">
                                <span style="color: #9ca3af; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</span>
                              </td>
                              <td style="vertical-align: top;">
                                <a href="tel:${phone}" style="color: #e5e7eb; font-size: 15px; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                                  ${phone}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}

                      <!-- Subject -->
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 20px;">
                                <span style="color: #9ca3af; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                              </td>
                              <td style="vertical-align: top;">
                                <span style="color: #f9fafb; font-size: 15px; font-weight: 600;">
                                  ${subject}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Message -->
                      <tr>
                        <td style="padding: 24px 0 0 0;">
                          <div style="margin-bottom: 12px;">
                            <span style="color: #9ca3af; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                          </div>
                          <div style="background: rgba(255, 255, 255, 0.03); padding: 24px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); border-left: 3px solid rgba(255, 255, 255, 0.3);">
                            <p style="margin: 0; color: #d1d5db; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                          </div>
                        </td>
                      </tr>

                    </table>

                    <!-- Quick Actions -->
                    <div style="margin-top: 32px; padding: 24px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                      <p style="margin: 0 0 16px 0; color: #f3f4f6; font-size: 14px; font-weight: 600; text-align: center;">
                        Quick Actions
                      </p>
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%); color: #111827; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; margin: 6px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
                              Reply via Email
                            </a>
                            ${phone ? `
                            <a href="tel:${phone}" style="display: inline-block; background: rgba(255, 255, 255, 0.1); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; margin: 6px; border: 1px solid rgba(255, 255, 255, 0.2);">
                              Call Client
                            </a>
                            ` : ''}
                          </td>
                        </tr>
                      </table>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 30px; background: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">
                            This email was sent from B-iconx portfolio contact form
                          </p>
                          <p style="margin: 0; color: #4b5563; font-size: 12px;">
                            © ${new Date().getFullYear()} B-iconx Portfolio. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
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
New Contact Form Submission

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
      from: 'B-iconx Portfolio <onboarding@resend.dev>',
      to: ['calvinbenard28@gmail.com'],
      replyTo: email,
      subject: `💼 New Inquiry: ${subject}`,
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