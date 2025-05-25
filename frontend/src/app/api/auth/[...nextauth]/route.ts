import { authOptions } from '@/lib/authOptions';
import NextAuth from 'next-auth';

console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
