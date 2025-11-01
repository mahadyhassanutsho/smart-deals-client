import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const GoogleProvider = new GoogleAuthProvider();

export const registerUser = async (email, password, displayName, photoURL) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName, photoURL });

    return { success: true, user, message: "Registered successfully!" };
  } catch (error) {
    let message;
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "Provided email is already registered.";
        break;
      case "auth/network-request-failed":
        message = "Network error. Please try again.";
        break;
      default:
        message = error.message || "An unknown error occurred.";
    }

    return { success: false, message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      user: userCredential.user,
      message: "Logged in successfully!",
    };
  } catch (error) {
    let message;
    switch (error.code) {
      case "auth/invalid-credential":
        message = "Invalid credential";
        break;
      case "auth/network-request-failed":
        message = "Network error. Please try again.";
        break;
      default:
        message = error.message || "Login failed. Please try again.";
    }

    return { success: false, message };
  }
};

export const loginWithProvider = async (provider) => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return {
      success: true,
      user: userCredential.user,
      message: "Logged in successfully!",
    };
  } catch (error) {
    let message;
    switch (error.code) {
      case "auth/popup-closed-by-user":
        message = "The popup was closed before completing the login.";
        break;
      case "auth/cancelled-popup-request":
        message = "Login popup request was cancelled. Try again.";
        break;
      case "auth/popup-blocked":
        message = "Popup was blocked by your browser. Please allow popups.";
        break;
      case "auth/network-request-failed":
        message = "Network error. Please try again.";
        break;
      default:
        message = error.message || "Login with provider failed.";
    }

    return { success: false, message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    let message = error.message || "Logout failed. Please try again.";
    return { success: false, message };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "A password reset link has been sent to your email address.",
    };
  } catch (error) {
    let message;

    switch (error.code) {
      case "auth/user-not-found":
        message = "No user found with that email address.";
        break;
      case "auth/too-many-requests":
        message = "Too many requests. Please try again later.";
        break;
      default:
        message = error.message || "Failed to send password reset email.";
    }

    return { success: false, message };
  }
};

export const updateUser = async (user, displayName, photoURL) => {
  try {
    await updateProfile(user, { displayName, photoURL });

    return {
      success: true,
      user: { ...user, displayName, photoURL },
      message: "Updated successfully!",
    };
  } catch (error) {
    let message;
    switch (error.code) {
      case "auth/network-request-failed":
        message = "Network error. Please try again.";
        break;
      default:
        message = error.message || "An unknown error occurred.";
    }

    return { success: false, message };
  }
};

export const subscribeToAuthStateChange = (callback) =>
  onAuthStateChanged(auth, callback);
