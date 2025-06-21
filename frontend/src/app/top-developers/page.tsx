import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { TopDevelopersClient } from './top-developers-client';
import { HeaderContainer, FooterContainer } from '@/containers';

export default async function TopDevelopersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <HeaderContainer />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
            color: '#ff6b6b',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          Please sign in to view top developers
        </div>
        <FooterContainer />
      </>
    );
  }

  return (
    <>
      <HeaderContainer />
      <TopDevelopersClient />
      <FooterContainer />
    </>
  );
}
