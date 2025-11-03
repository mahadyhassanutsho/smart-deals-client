const Loading = ({ type = "inline" }) => {
  if (type === "block") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-infinity loading-xl" />
      </div>
    );
  }

  return <span className="loading loading-infinity loading-xl" />;
};

export default Loading;
