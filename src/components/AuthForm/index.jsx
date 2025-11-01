import { Link } from "react-router";
import { useForm } from "react-hook-form";

export default function AuthForm({ type, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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
                placeholder="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered"
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
              <input
                type="password"
                placeholder="password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered"
              />
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
                    className="input input-bordered"
                  />
                  {errors.displayName && (
                    <span className="text-error text-sm">
                      {errors.displayName.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Profile image URL"
                    {...register("imageUrl")}
                    className="input input-bordered"
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
