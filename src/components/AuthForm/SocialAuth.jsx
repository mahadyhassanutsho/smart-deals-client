const SocialAuth = ({
  label,
  icon: Icon,
  onClick,
  disabled = false,
  variant = "outline",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} w-full flex items-center justify-center gap-2 ${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{label}</span>
    </button>
  );
};

export default SocialAuth;
