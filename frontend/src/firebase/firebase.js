import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbFp3tRXT3jiEzpnUjvnB3WcSJs2_VGFY",
  authDomain: "usermanagementsystem-80f6e.firebaseapp.com",
  projectId: "usermanagementsystem-80f6e",
  storageBucket: "usermanagementsystem-80f6e.appspot.com",
  messagingSenderId: "854726573412",
  appId: "1:854726573412:web:c7a0ba84058e3c7a10ce71"
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage};
