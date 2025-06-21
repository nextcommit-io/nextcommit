import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ login: null }, { status: 401 });
  }
  return NextResponse.json({
    login: (session.user as { login?: string })?.login || null,
    name: session.user?.name || null,
    image: session.user?.image || null,
    email: session.user?.email || null,
    accessToken: (session as any)?.accessToken || null,
  });
} 