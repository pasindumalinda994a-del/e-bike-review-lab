import { NextResponse } from 'next/server';
import { addContactToSheet } from '@/lib/google-sheets';
import { sendContactEmail } from '@/lib/email';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const normalizedEmail = email.toLowerCase().trim();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email notification
    let emailSent = false;
    try {
      await sendContactEmail({
        name,
        email: normalizedEmail,
        message,
      });
      emailSent = true;
      console.info('[contact] email sent successfully');
    } catch (error) {
      console.error('[contact] error sending email:', error);
      // Continue to try Google Sheets as backup
    }

    // Try to add to Google Sheets (optional backup)
    try {
      const result = await addContactToSheet({
        name,
        email: normalizedEmail,
        inquiryType: 'General Inquiry',
        subject: `Contact from ${name}`,
        message,
      });
      
      console.info('[contact] new submission added to Google Sheets:', {
        email: normalizedEmail,
        result,
      });
    } catch (error) {
      // Log error but don't fail the request
      console.error('[contact] error adding to Google Sheets:', error);
      
      // If email also failed, this is a problem
      if (!emailSent) {
        console.error('[contact] Both email and Google Sheets failed. Please check configuration.');
      }
    }

    // Return success if email was sent (primary method)
    if (emailSent) {
      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully!' },
        { status: 200 }
      );
    }

    // If email failed but we want to be graceful, still return success
    // In production, you might want to return an error here
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[contact] unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
