import { Navigate } from "react-router";

import { useAuth } from "../providers/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, authIsReady } = useAuth();

  if (!authIsReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
