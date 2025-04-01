const SuccessAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="alert-success"
      className="fixed top-7 right-12 flex items-center p-5 mb-10 text-green-700 rounded-lg bg-gray-300 "
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm-1 9.5-2-2a1 1 0 1 1 1.4-1.4l1.3 1.3 3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0Z" />
      </svg>
      <span className="sr-only">Success</span>
      <div className="ml-3 text-sm font-medium">{message}</div>
    </div>
  );
};

export default SuccessAlert;
