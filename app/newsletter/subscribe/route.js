import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return NextResponse.redirect(
      new URL('/newsletter?error=missing-email', request.url),
      303,
    );
  }

  if (!EMAIL_PATTERN.test(email.toLowerCase())) {
    return NextResponse.redirect(
      new URL('/newsletter?error=invalid-email', request.url),
      303,
    );
  }

  console.info('[newsletter] new subscriber request:', email);

  return NextResponse.redirect(
    new URL('/newsletter?success=1', request.url),
    303,
  );
}

