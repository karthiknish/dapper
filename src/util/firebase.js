// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCMfwpIXwKMb5ndb9wkzWOtAi5klHeoAEs",
  authDomain: "dapper-16e4b.firebaseapp.com",
  projectId: "dapper-16e4b",
  storageBucket: "dapper-16e4b.appspot.com",
  messagingSenderId: "154802071699",
  appId: "1:154802071699:web:daa8c658971e5f3b578566",
  measurementId: "G-Z252C49ZJ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
      })
    );

    return userCredential;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This email address is already registered. Try signing in.");
    } else {
      alert(error.message);
    }
    throw error;
  }
};
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
      })
    );
    return userCredential;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("No user found with this email address. Please register.");
    } else if (error.code === "auth/wrong-password") {
      alert("Incorrect password. Please try again.");
    } else {
      alert(error.message);
    }
    throw error;
  }
};
export const signOut = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// const analytics = getAnalytics(app);
