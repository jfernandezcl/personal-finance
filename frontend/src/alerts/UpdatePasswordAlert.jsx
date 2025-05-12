import { useEffect, useState } from "react";

export default function UpdatePasswordAlert({ message, type }) {
  const [alertMessage, setAlertMessage] = useState(message);
  const [alertType, setAlertType] = useState(type);

  useEffect(() => {
    if (message) {
      setAlertMessage(message);
      setAlertType(type);

      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message, type]);

  if (!alertMessage) return null;

  return (
    <div
      className={`mb-4 rounded-md p-4 text-sm border ${
        alertType === "success"
          ? "bg-green-50 text-green-800 border-green-200"
          : "bg-red-50 text-red-800 border-red-200"
      }`}
    >
      {alertMessage}
    </div>
  );
}
