'use client';

import { signIn } from 'next-auth/react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #f4f6f8;
`;

const Card = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Button = styled.button`
  background: #24292e;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;

export default function SignIn() {
  console.log('GITHUB_CLIENT_ID:', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);

  return (
    <Container>
      <Card>
        <h2>Sign in to NextCommit</h2>
        <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
      </Card>
    </Container>
  );
}
