import { Navigate } from "react-router";

import { useAuth } from "../providers/AuthProvider";

import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, authIsReady } = useAuth();

  if (!authIsReady) {
    return <Loading type="block" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
