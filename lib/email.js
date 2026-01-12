/**
 * Email sending utility using nodemailer
 * 
 * Environment variables required:
 * - SMTP_HOST (e.g., smtp.gmail.com)
 * - SMTP_PORT (e.g., 587)
 * - SMTP_USER (your email address)
 * - SMTP_PASS (your email password or app password)
 * - CONTACT_EMAIL (recipient email address)
 */

import nodemailer from 'nodemailer';

/**
 * Create a nodemailer transporter
 * @returns {Promise<nodemailer.Transporter>}
 */
async function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  // Verify connection
  await transporter.verify();
  return transporter;
}

/**
 * Send contact form email
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Contact name
 * @param {string} contactData.email - Contact email
 * @param {string} contactData.message - Message content
 * @returns {Promise<Object>} Result object with success status
 */
export async function sendContactEmail({ name, email, message }) {
  const recipientEmail = process.env.CONTACT_EMAIL || 'pasindumalinda994a@gmail.com';

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipientEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the contact form on your website.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.info('[email] Contact form email sent successfully:', {
      messageId: info.messageId,
      to: recipientEmail,
      from: email,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[email] Error sending contact email:', error);
    throw error;
  }
}
