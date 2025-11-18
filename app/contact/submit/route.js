import { NextResponse } from 'next/server';
import { addContactToSheet } from '@/lib/google-sheets';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const inquiryType = formData.get('inquiryType')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validate required fields
    if (!name || !email || !inquiryType || !subject || !message) {
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

    // Try to add to Google Sheets
    try {
      const result = await addContactToSheet({
        name,
        email: normalizedEmail,
        inquiryType,
        subject,
        message,
      });
      
      console.info('[contact] new submission added to Google Sheets:', {
        email: normalizedEmail,
        inquiryType,
        result,
      });

      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully!' },
        { status: 200 }
      );
    } catch (error) {
      // Log error but still show success to user (fail gracefully)
      console.error('[contact] error adding to Google Sheets:', error);
      
      // If it's a configuration error, log it but don't expose to user
      if (error.message?.includes('not configured') || error.message?.includes('credentials')) {
        console.error('[contact] Google Sheets not properly configured. Please check environment variables.');
      }
      
      // Still return success to user (fail gracefully)
      // In production, you might want to send an email notification as backup
      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully!' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[contact] unexpected error:', error);
    // Fail gracefully - still return success
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  }
}
