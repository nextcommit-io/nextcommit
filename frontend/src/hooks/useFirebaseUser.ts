'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { firestoreService } from '@/lib';

interface UserProfile {
  bio: string;
  location: string;
  website: string;
  company: string;
  twitter: string;
  github: string;
}

interface UserStats {
  projects: number;
  contributions: number;
  followers: number;
  following: number;
}

interface FirestoreUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerData: Array<{
    providerId: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }>;
  createdAt: Date;
  lastSignIn: Date;
  isActive: boolean;
  profile: UserProfile;
  stats: UserStats;
  id?: string;
}

interface UseFirebaseUserReturn {
  userData: FirestoreUser | null;
  loading: boolean;
  error: string | null;
  updateUserProfile: (
    updates: Partial<UserProfile>
  ) => Promise<{ success: boolean; error?: string }>;
  updateUserStats: (
    updates: Partial<UserStats>
  ) => Promise<{ success: boolean; error?: string }>;
}

export const useFirebaseUser = (user: User | null): UseFirebaseUserReturn => {
  const [userData, setUserData] = useState<FirestoreUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch or create user in Firestore when user signs in
  useEffect(() => {
    const fetchOrCreateUser = async () => {
      if (!user) {
        setUserData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Try to fetch existing user from Firestore
        const { data: existingUser, error: fetchError } =
          await firestoreService.getDocument('users', user.uid);

        if (fetchError && fetchError.message !== 'Document not found') {
          setError(`Error fetching user: ${fetchError.message}`);
          return;
        }

        if (existingUser) {
          // User exists, update with latest data
          const updateData = {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastSignIn: new Date(),
            providerData: user.providerData.map((provider) => ({
              providerId: provider.providerId,
              displayName: provider.displayName,
              email: provider.email,
              photoURL: provider.photoURL,
            })),
          };

          const { error: updateError } = await firestoreService.updateDocument(
            'users',
            user.uid,
            updateData
          );
          if (updateError) {
            setError(`Error updating user: ${updateError.message}`);
          } else {
            // Cast existingUser to include all possible properties
            const existingUserData = existingUser as any;

            // Ensure all required properties are present
            const updatedUserData: FirestoreUser = {
              uid: existingUserData.uid || user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              providerData: user.providerData.map((provider) => ({
                providerId: provider.providerId,
                displayName: provider.displayName,
                email: provider.email,
                photoURL: provider.photoURL,
              })),
              createdAt: existingUserData.createdAt || new Date(),
              lastSignIn: new Date(),
              isActive:
                existingUserData.isActive !== undefined
                  ? existingUserData.isActive
                  : true,
              profile: existingUserData.profile || {
                bio: '',
                location: '',
                website: '',
                company: '',
                twitter: '',
                github:
                  user.providerData.find((p) => p.providerId === 'github.com')
                    ?.displayName || '',
              },
              stats: existingUserData.stats || {
                projects: 0,
                contributions: 0,
                followers: 0,
                following: 0,
              },
              id: user.uid, // Use UID as the document ID
            };
            setUserData(updatedUserData);
          }
        } else {
          // User doesn't exist, create new user document with UID as document ID
          const newUserData: FirestoreUser = {
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
            lastSignIn: new Date(),
            isActive: true,
            profile: {
              bio: '',
              location: '',
              website: '',
              company: '',
              twitter: '',
              github:
                user.providerData.find((p) => p.providerId === 'github.com')
                  ?.displayName || '',
            },
            stats: {
              projects: 0,
              contributions: 0,
              followers: 0,
              following: 0,
            },
          };

          // Use setDocument with UID as document ID to prevent duplicates
          const { error: createError } = await firestoreService.setDocument(
            'users',
            user.uid,
            newUserData
          );
          if (createError) {
            setError(`Error creating user: ${createError.message}`);
          } else {
            console.log('New user created with UID:', user.uid);
            setUserData({ ...newUserData, id: user.uid });
          }
        }
      } catch (error) {
        setError(
          `Unexpected error: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateUser();
  }, [user]);

  // Function to update user profile
  const updateUserProfile = async (
    updates: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user || !userData) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const { error } = await firestoreService.updateDocument(
        'users',
        user.uid,
        {
          profile: { ...userData.profile, ...updates },
        }
      );

      if (error) {
        return { success: false, error: error.message };
      }

      // Update local state
      setUserData((prev) =>
        prev ? { ...prev, profile: { ...prev.profile, ...updates } } : null
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  // Function to update user stats
  const updateUserStats = async (
    updates: Partial<UserStats>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user || !userData) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const { error } = await firestoreService.updateDocument(
        'users',
        user.uid,
        {
          stats: { ...userData.stats, ...updates },
        }
      );

      if (error) {
        return { success: false, error: error.message };
      }

      // Update local state
      setUserData((prev) =>
        prev ? { ...prev, stats: { ...prev.stats, ...updates } } : null
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  return {
    userData,
    loading,
    error,
    updateUserProfile,
    updateUserStats,
  };
};
