import { use, useState, useEffect, createContext } from "react";
import { subscribeToAuthStateChange } from "../services/firebase.js";

const AuthContext = createContext({
  user: { accessToken: "", displayName: "", email: "", photoURL: "" },
  authIsReady: false,
  // eslint-disable-next-line no-unused-vars
  setUser: (user) => {},
  clearUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const auth = use(AuthContext);
  if (!auth) {
    throw new Error("useAuth is only usable inside the AuthProvider");
  }
  return auth;
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);

  const setUser = (currentUser) => {
    setCurrentUser(currentUser);
    setAuthIsReady(true);
  };

  const clearUser = () => setCurrentUser(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthStateChange((user) => {
      setCurrentUser(user);
      setAuthIsReady(true);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ user: currentUser, authIsReady, setUser, clearUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
