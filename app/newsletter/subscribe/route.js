import { NextResponse } from 'next/server';
import { addSubscriberToSheet } from '@/lib/google-sheets';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
      return NextResponse.redirect(
        new URL('/newsletter?error=missing-email', request.url),
        303,
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return NextResponse.redirect(
        new URL('/newsletter?error=invalid-email', request.url),
        303,
      );
    }

    // Try to add to Google Sheets
    try {
      const result = await addSubscriberToSheet(normalizedEmail);
      console.info('[newsletter] new subscriber added to Google Sheets:', normalizedEmail, result);
    } catch (error) {
      // Log error but still show success to user (fail gracefully)
      console.error('[newsletter] error adding to Google Sheets:', error);
      
      // If it's a configuration error, log it but don't expose to user
      if (error.message?.includes('not configured') || error.message?.includes('credentials')) {
        console.error('[newsletter] Google Sheets not properly configured. Please check environment variables.');
      }
      
      // Continue with success response (fail gracefully)
      // You might want to add error tracking here (e.g., Sentry)
    }

    return NextResponse.redirect(
      new URL('/newsletter?success=1', request.url),
      303,
    );
  } catch (error) {
    console.error('[newsletter] unexpected error:', error);
    // Fail gracefully - still redirect to success page
    return NextResponse.redirect(
      new URL('/newsletter?success=1', request.url),
      303,
    );
  }
}

