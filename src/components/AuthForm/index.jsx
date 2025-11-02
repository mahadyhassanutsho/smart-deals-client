import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import useToggle from "../../hooks/useToggle";

export default function AuthForm({ type, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, toggleShowPassword] = useToggle();

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center capitalize">
            {type === "login" ? "Login" : "Register"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-error text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="input input-bordered w-full"
                />

                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-0 top-0 px-2 h-full flex items-center justify-center cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Register extras */}
            {type === "register" && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Display Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register("displayName", {
                      required: "Display name required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.displayName && (
                    <span className="text-error text-sm">
                      {errors.displayName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Your profile photo"
                    {...register("photoURL")}
                    className="input input-bordered w-full"
                  />
                </div>
              </>
            )}

            <div className="form-control mt-4">
              <button
                className={`btn btn-primary w-full ${
                  isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Please wait..."
                  : type === "login"
                  ? "Login"
                  : "Register"}
              </button>
            </div>
          </form>

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
        </div>
      </div>
    </div>
  );
}
