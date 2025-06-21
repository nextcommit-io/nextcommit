'use client';
import { ReactNode } from 'react';

interface ProfileContentProps {
  children: ReactNode;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({ children }) => {
  return (
    <div style={{ 
      background: 'white',
      borderRadius: 16,
      padding: 32,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e9ecef'
    }}>
      {children}
    </div>
  );
}; 