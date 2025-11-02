import { Eye, EyeOff, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import useToggle from "../../hooks/useToggle";

import FormInput from "../FormInput";
import AuthLink from "./AuthLink";
import SocialAuth from "./SocialAuth";

export default function AuthForm({ type, onSubmit, onGoogleClick }) {
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
            <FormInput
              label="Email"
              type="email"
              placeholder="Email"
              register={register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />

            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
              rightIcon={
                <button type="button" onClick={toggleShowPassword}>
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            {type === "register" && (
              <>
                <FormInput
                  label="Display Name"
                  placeholder="Your name"
                  register={register("displayName", {
                    required: "Display name required",
                  })}
                  error={errors.displayName?.message}
                />
                <FormInput
                  label="Photo URL"
                  type="url"
                  placeholder="Your profile photo"
                  register={register("photoURL")}
                />
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

          <div className="divider">or</div>

          <SocialAuth
            label="Continue with Google"
            icon={Globe}
            onClick={onGoogleClick}
            disabled={isSubmitting}
          />

          <AuthLink type={type} />
        </div>
      </div>
    </div>
  );
}
