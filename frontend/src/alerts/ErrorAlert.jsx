const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <div
      id="alert-danger"
      className="fixed top-7 right-12 flex items-center p-5 mb-10 text-[#025963] rounded-lg bg-gray-300"
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Error</span>
      <div className="ml-3 text-sm font-medium">{error}</div>
    </div>
  );
};

export default ErrorAlert;
