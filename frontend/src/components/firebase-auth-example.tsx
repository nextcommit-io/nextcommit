'use client';

import React, { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { firestoreService, storageService } from '@/lib';
import { Button } from '@/design-system/button';
import { Card } from '@/design-system/card';
import { Heading, Paragraph, Label } from '@/design-system/text';

export const FirebaseAuthExample: React.FC = () => {
  const {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    signOut,
  } = useFirebaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async () => {
    const { user, error } = await signIn(email, password);
    if (error) {
      setMessage(`Sign in error: ${error.message}`);
    } else {
      setMessage('Signed in successfully!');
    }
  };

  const handleSignUp = async () => {
    const { user, error } = await signUp(email, password, displayName);
    if (error) {
      setMessage(`Sign up error: ${error.message}`);
    } else {
      setMessage('Signed up successfully!');
    }
  };

  const handleGoogleSignIn = async () => {
    const { user, error } = await signInWithGoogle();
    if (error) {
      setMessage(`Google sign in error: ${error.message}`);
    } else {
      setMessage('Signed in with Google successfully!');
    }
  };

  const handleGithubSignIn = async () => {
    const { user, error } = await signInWithGithub();
    if (error) {
      setMessage(`GitHub sign in error: ${error.message}`);
    } else {
      setMessage('Signed in with GitHub successfully!');
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      setMessage(`Sign out error: ${error.message}`);
    } else {
      setMessage('Signed out successfully!');
    }
  };

  const handleCreateDocument = async () => {
    if (!user) {
      setMessage('Please sign in first');
      return;
    }

    const { id, error } = await firestoreService.addDocument('users', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerData: user.providerData.map((provider) => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoURL: provider.photoURL,
      })),
      createdAt: new Date(),
    });

    if (error) {
      setMessage(`Error creating document: ${error.message}`);
    } else {
      setMessage(`Document created with ID: ${id}`);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) {
      setMessage('Please select a file and sign in first');
      return;
    }

    const path = `users/${user.uid}/uploads/${file.name}`;
    const { url, error } = await storageService.uploadFile(path, file);

    if (error) {
      setMessage(`Error uploading file: ${error.message}`);
    } else {
      setMessage(`File uploaded successfully! URL: ${url}`);
    }
  };

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return (
    <Card>
      <Heading size="32px">Firebase Authentication Example</Heading>

      {!user ? (
        <div>
          <Heading size="24px">Sign In / Sign Up</Heading>

          {/* Email/Password Authentication */}
          <div style={{ marginBottom: '20px' }}>
            <Label>Email/Password Authentication</Label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: 'block',
                margin: '10px 0',
                padding: '8px',
                width: '100%',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: 'block',
                margin: '10px 0',
                padding: '8px',
                width: '100%',
              }}
            />
            <input
              type="text"
              placeholder="Display Name (for sign up)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{
                display: 'block',
                margin: '10px 0',
                padding: '8px',
                width: '100%',
              }}
            />
            <Button onClick={handleSignIn}>Sign In</Button>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </div>

          {/* Social Authentication */}
          <div style={{ marginBottom: '20px' }}>
            <Label>Social Authentication</Label>
            <div style={{ marginTop: '10px' }}>
              <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
              <Button onClick={handleGithubSignIn}>Sign In with GitHub</Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Heading size="24px">
            Welcome, {user.displayName || user.email}!
          </Heading>

          {/* User Info */}
          <div style={{ marginBottom: '20px' }}>
            <Label>User Information</Label>
            <Paragraph>Email: {user.email}</Paragraph>
            <Paragraph>Display Name: {user.displayName || 'Not set'}</Paragraph>
            <Paragraph>
              Provider: {user.providerData[0]?.providerId || 'Email/Password'}
            </Paragraph>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginTop: '10px',
                }}
              />
            )}
          </div>

          {/* Actions */}
          <div style={{ marginBottom: '20px' }}>
            <Label>Actions</Label>
            <div style={{ marginTop: '10px' }}>
              <Button onClick={handleSignOut}>Sign Out</Button>
              <Button onClick={handleCreateDocument}>
                Create User Document
              </Button>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <Label>File Upload</Label>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'block', margin: '10px 0' }}
            />
          </div>
        </div>
      )}

      {message && (
        <Paragraph color={message.includes('error') ? 'red' : 'green'}>
          {message}
        </Paragraph>
      )}
    </Card>
  );
};
