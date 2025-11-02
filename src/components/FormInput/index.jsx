const FormInput = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  rightIcon,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className="input input-bordered w-full"
        />
        {rightIcon && (
          <div className="absolute right-0 top-0 px-2 h-full flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
};

export default FormInput;
