import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
      <div className="max-w-md p-6">
        <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-base-content/70 mb-6">
          Looks like this page wandered off... or maybe it never existed. Either
          way, let’s get you back to civilization!
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
