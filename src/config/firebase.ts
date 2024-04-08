// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA85xm3Arq0AqeN-NildMmkHuggwhf-TTU",
  authDomain: "social-media-89ee7.firebaseapp.com",
  projectId: "social-media-89ee7",
  storageBucket: "social-media-89ee7.appspot.com",
  messagingSenderId: "79465921332",
  appId: "1:79465921332:web:f29d854d7806feb0790361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); //here we have all the information of the user
export const provider = new GoogleAuthProvider();