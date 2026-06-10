import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA7R4f-sihRCq3u9SxAshFS8JytIfVjqY0",
  authDomain: "dergamo-821e7.firebaseapp.com",
  projectId: "dergamo-821e7",
  storageBucket: "dergamo-821e7.firebasestorage.app",
  messagingSenderId: "700999424924",
  appId: "1:700999424924:web:c9da6ab7a1e1308725c659",
  measurementId: "G-DWHSGBEMTB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
