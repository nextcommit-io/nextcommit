# Firebase Integration Guide

This document explains how Firebase is integrated into your Next.js frontend and how to use it.

## Overview

Firebase has been integrated into your Next.js application with the following services:

- **Authentication** - User sign-in/sign-up with email/password, Google, and GitHub
- **Firestore** - NoSQL database for storing and retrieving data
- **Storage** - File upload and storage
- **Analytics** - User behavior tracking (client-side only)

## Configuration

The Firebase configuration is located in `src/lib/firebase.ts` and includes your project's configuration:

- API Key: `AIzaSyB7QNtsvom4_-5eCPw99ZzgeVvUH_Rr4r0`
- Project ID: `nextcommit-1241e`
- Auth Domain: `nextcommit-1241e.firebaseapp.com`

## Setup

### 1. Firebase Provider

The `FirebaseProvider` is already set up in `src/components/providers.tsx` and wraps your entire application, making Firebase services available throughout the app.

### 2. Context and Hooks

- `FirebaseContext` - Provides Firebase services to components
- `useFirebase` - Hook to access Firebase services
- `useFirebaseAuth` - Custom hook for authentication state management

## Usage Examples

### Authentication

```tsx
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

const MyComponent = () => {
  const {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    signOut,
  } = useFirebaseAuth();

  const handleSignIn = async () => {
    const { user, error } = await signIn('user@example.com', 'password');
    if (error) {
      console.error('Sign in error:', error.message);
    } else {
      console.log('Signed in successfully!');
    }
  };

  const handleGithubSignIn = async () => {
    const { user, error } = await signInWithGithub();
    if (error) {
      console.error('GitHub sign in error:', error.message);
    } else {
      console.log('Signed in with GitHub successfully!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign In with Email</button>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
          <button onClick={handleGithubSignIn}>Sign In with GitHub</button>
        </div>
      )}
    </div>
  );
};
```

### Firestore Database

```tsx
import { firestoreService } from '@/lib';

// Create a document
const createUser = async (userData) => {
  const { id, error } = await firestoreService.addDocument('users', {
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created with ID:', id);
  }
};

// Get a document
const getUser = async (userId) => {
  const { data, error } = await firestoreService.getDocument('users', userId);

  if (error) {
    console.error('Error getting user:', error.message);
  } else {
    console.log('User data:', data);
  }
};

// Update a document
const updateUser = async (userId, updates) => {
  const { error } = await firestoreService.updateDocument(
    'users',
    userId,
    updates
  );

  if (error) {
    console.error('Error updating user:', error.message);
  } else {
    console.log('User updated successfully');
  }
};

// Query documents
const getUsersByRole = async (role) => {
  const { data, error } = await firestoreService.getDocuments('users', [
    { type: 'where', field: 'role', operator: '==', value: role },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' },
    { type: 'limit', value: 10 },
  ]);

  if (error) {
    console.error('Error querying users:', error.message);
  } else {
    console.log('Users:', data);
  }
};
```

### File Storage

```tsx
import { storageService } from '@/lib';

// Upload a file
const uploadFile = async (file) => {
  const path = `users/${userId}/uploads/${file.name}`;
  const { url, error } = await storageService.uploadFile(path, file);

  if (error) {
    console.error('Error uploading file:', error.message);
  } else {
    console.log('File uploaded successfully:', url);
  }
};

// Get download URL
const getFileUrl = async (path) => {
  const { url, error } = await storageService.getDownloadURL(path);

  if (error) {
    console.error('Error getting file URL:', error.message);
  } else {
    console.log('File URL:', url);
  }
};

// Delete a file
const deleteFile = async (path) => {
  const { error } = await storageService.deleteFile(path);

  if (error) {
    console.error('Error deleting file:', error.message);
  } else {
    console.log('File deleted successfully');
  }
};
```

### Using Firebase Context

```tsx
import { useFirebase } from '@/contexts';

const MyComponent = () => {
  const { auth, db, storage, analytics } = useFirebase();

  // Use Firebase services directly
  const currentUser = auth.currentUser;

  return <div>{currentUser && <p>Welcome, {currentUser.email}!</p>}</div>;
};
```

## Setting up GitHub Authentication

To enable GitHub authentication in your Firebase project:

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`nextcommit-1241e`)
3. Navigate to **Authentication** > **Sign-in method**
4. Click on **GitHub** provider
5. Enable GitHub authentication
6. Add your GitHub OAuth App credentials

### 2. GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: NextCommit (or your app name)
   - **Homepage URL**: `https://nextcommit-1241e.firebaseapp.com`
   - **Authorization callback URL**: `https://nextcommit-1241e.firebaseapp.com/__/auth/handler`
4. Click **Register application**
5. Copy the **Client ID** and **Client Secret**

### 3. Configure Firebase

1. Back in Firebase Console, paste the GitHub Client ID and Client Secret
2. Save the configuration

### 4. Usage in Code

```tsx
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

const { signInWithGithub } = useFirebaseAuth();

const handleGithubSignIn = async () => {
  const { user, error } = await signInWithGithub();
  if (error) {
    console.error('GitHub sign in error:', error.message);
  } else {
    console.log('Signed in with GitHub:', user);
    // Access GitHub-specific data
    console.log('GitHub username:', user.providerData[0]?.displayName);
    console.log('GitHub profile photo:', user.providerData[0]?.photoURL);
  }
};
```

## Security Rules

Make sure to set up proper Firestore security rules in your Firebase console:

```javascript
// Example Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read access for some collections
    match /public/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Storage Rules

Set up Firebase Storage security rules:

```javascript
// Example Storage security rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload files to their own folder
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read access for some files
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Example Component

See `src/components/firebase-auth-example.tsx` for a complete example of how to use Firebase authentication (including GitHub), Firestore, and storage in a React component.

## Next Steps

1. **Enable Authentication Methods**: Go to Firebase Console > Authentication > Sign-in method and enable the providers you want to use (Email/Password, Google, GitHub)

2. **Set up GitHub OAuth**: Follow the GitHub authentication setup guide above

3. **Set up Firestore Database**: Go to Firebase Console > Firestore Database and create your database

4. **Configure Storage**: Go to Firebase Console > Storage and set up your storage bucket

5. **Set Security Rules**: Configure appropriate security rules for Firestore and Storage

6. **Test Integration**: Use the example component to test your Firebase integration

## Troubleshooting

- **Analytics not working**: Analytics only works on the client side and requires user consent
- **Authentication errors**: Make sure you've enabled the authentication methods in Firebase Console
- **GitHub authentication errors**: Verify your GitHub OAuth App configuration and callback URLs
- **Permission errors**: Check your Firestore and Storage security rules
- **Import errors**: Make sure all Firebase dependencies are properly installed

## Dependencies

The following Firebase packages are already installed:

- `firebase` - Core Firebase SDK
- Firebase services are imported as needed (auth, firestore, storage, analytics)
