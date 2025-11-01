import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <div className="flex-none hidden md:flex gap-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn btn-ghost ${
            isActive ? "text-primary font-semibold" : "text-base-content"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `btn btn-ghost ${
            isActive ? "text-primary font-semibold" : "text-base-content"
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/deals"
        className={({ isActive }) =>
          `btn btn-ghost ${
            isActive ? "text-primary font-semibold" : "text-base-content"
          }`
        }
      >
        Deals
      </NavLink>
    </div>
  );
};

export default NavLinks;
