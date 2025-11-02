const ALERT_TYPES = {
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
  info: "alert-info",
};

const Toast = ({ type = "info", message }) => {
  return (
    <div className="toast">
      <div className={`alert ${ALERT_TYPES[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
