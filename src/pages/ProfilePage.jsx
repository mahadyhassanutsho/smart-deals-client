import { Edit, LogOut } from "lucide-react";

import { useAuth } from "../providers/AuthProvider";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={user.photoURL}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover ring-4 ring-primary/30"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.displayName}</h2>
          <p className="text-base-content/70">{user.email}</p>
          <p className="text-sm opacity-70">Joined {user.joinedAt}</p>

          <div className="card-actions mt-4">
            <button className="btn btn-outline btn-sm flex items-center gap-1">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
            <button className="btn btn-error btn-sm flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
