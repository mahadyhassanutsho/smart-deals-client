import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link
        to="/"
        className="text-xl font-bold tracking-wide text-primary hover:text-primary-focus transition"
      >
        Smart<span className="text-secondary">Deals</span>
      </Link>
    </div>
  );
};

export default Logo;
