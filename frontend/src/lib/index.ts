// Firebase exports
export { auth, db, storage, analytics, app as firebaseApp } from './firebase';
export { default as firebase } from './firebase';

// Firebase services
export {
  authService,
  firestoreService,
  storageService,
} from './services/firebase';

// Other exports
export * from './authOptions';
export * from './github';
