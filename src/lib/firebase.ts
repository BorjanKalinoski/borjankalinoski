import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyBAq9GskMOk6sghpQFh11m2w-P-EiqstlU',
  appId: '1:86632692443:web:cee1d35fc2f0a0b5adaafe',
  authDomain: 'borjankalinoski-app.firebaseapp.com',
  measurementId: 'G-C7TWF1DGQ8',
  messagingSenderId: '86632692443',
  projectId: 'borjankalinoski-app',
  storageBucket: 'borjankalinoski-app.appspot.com',
};

// Initialize Firebase
let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  await deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

/// / Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
