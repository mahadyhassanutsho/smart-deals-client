import { Link } from "react-router";

const AuthLink = ({ type }) => {
  return (
    <p className="text-center mt-4">
      {type === "login" ? (
        <>
          Don’t have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </>
      )}
    </p>
  );
};

export default AuthLink;
