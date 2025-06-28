import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  QueryConstraint,
  CollectionReference,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { auth, db, storage } from '../firebase';

// Authentication Services
export const authService = {
  // Sign in with email and password
  signInWithEmail: async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },

  // Sign up with email and password
  signUpWithEmail: async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },

  // Sign in with GitHub
  signInWithGithub: async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
};

// Firestore Services
export const firestoreService = {
  // Create or update a document
  setDocument: async (collectionName: string, id: string, data: any) => {
    try {
      await setDoc(doc(db, collectionName, id), data, { merge: true });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Get a document
  getDocument: async (collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
      } else {
        return { data: null, error: new Error('Document not found') };
      }
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Update a document
  updateDocument: async (collectionName: string, id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Add a document with auto-generated ID
  addDocument: async (collectionName: string, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, error: null };
    } catch (error) {
      return { id: null, error: error as Error };
    }
  },

  // Delete a document
  deleteDocument: async (collectionName: string, id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Get documents with query
  getDocuments: async (
    collectionName: string,
    constraints: QueryConstraint[] = []
  ) => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, ...constraints);

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { data: documents, error: null };
    } catch (error) {
      return { data: [], error: error as Error };
    }
  },
};

// Storage Services
export const storageService = {
  // Upload file
  uploadFile: async (path: string, file: File) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { url: downloadURL, error: null };
    } catch (error) {
      return { url: null, error: error as Error };
    }
  },

  // Get download URL
  getDownloadURL: async (path: string) => {
    try {
      const url = await getDownloadURL(ref(storage, path));
      return { url, error: null };
    } catch (error) {
      return { url: null, error: error as Error };
    }
  },

  // Delete file
  deleteFile: async (path: string) => {
    try {
      await deleteObject(ref(storage, path));
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
};
