// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { config } from './config';
import { getStorage } from 'firebase/storage';

// Initialize Firebase app
const app = initializeApp(config.firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

// Chat Collection
export const chatCollection = collection(firestore, 'chat');

// Messages Collection
export const messagesCollection = collection(firestore, 'messages');

// Listings Collection
export const listingsCollection = collection(firestore, 'listings');
