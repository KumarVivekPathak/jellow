import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add this if using Firebase Storage
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  measurementId: Constants.expoConfig.extra.measurementId,
  databaseURL: Constants.expoConfig.extra.databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use the app instance here
const database = getFirestore(app);
const storage = getStorage(app); // Add this if using Firebase Storage

export { auth, database, storage };
