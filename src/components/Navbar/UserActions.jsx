import { NavLink } from "react-router";
import { useToast } from "buttered-toast";

import { useAuth } from "../../providers/AuthProvider";
import { logoutUser } from "../../services/firebase";

import Loading from "../Loading";
import Toast from "../Toast";

const UserActions = () => {
  const { show } = useToast();
  const { user, authIsReady, clearUser } = useAuth();

  const handleLogout = async () => {
    const { success, message } = await logoutUser();

    if (success) {
      clearUser();
      show(<Toast type="success" message={message} />, { timeout: 5000 });
    } else {
      show(<Toast type="error" message={message} />, { timeout: 5000 });
    }
  };

  return authIsReady ? (
    <div className="flex-none gap-2">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="user-avatar" src={user.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-1 p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex gap-2">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-transparent border-primary text-primary"
                  : "bg-primary border-transparent text-white hover:bg-primary/90"
              }`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-transparent border-secondary text-secondary"
                  : "bg-secondary border-transparent text-white hover:bg-secondary/90"
              }`
            }
          >
            Register
          </NavLink>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default UserActions;
