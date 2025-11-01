import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserActions from "./UserActions";

const Navbar = () => {
  return (
    <div className="navbar justify-between bg-base-100 shadow-md">
      <Logo />

      <NavLinks />

      <UserActions />
    </div>
  );
};

export default Navbar;
