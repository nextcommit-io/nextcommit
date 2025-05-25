'use client';

import { useSession, signOut } from 'next-auth/react';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Not signed in</p>;

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <img src={session.user?.image || ''} alt="avatar" width={50} />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
