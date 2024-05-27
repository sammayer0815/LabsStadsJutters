// Import necessary functions
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { config } from './config';

// Initialize Firebase app
const app = initializeApp(config.firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);


// Messages Collection
export const messagesCollection = collection(firestore, 'messages');