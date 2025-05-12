const SuccessAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="alert-success"
      className="flex items-center p-4 mb-4 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg shadow-sm"
      role="alert"
    >
      <svg
        className="w-5 h-5 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm-1 9.5-2-2a1 1 0 1 1 1.4-1.4l1.3 1.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0Z" />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default SuccessAlert;
