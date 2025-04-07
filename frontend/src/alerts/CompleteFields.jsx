import { AlertTriangle } from "lucide-react";

function CompleteFields({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="flex items-start p-3 mt-4 bg-red-100 border border-red-400 text-red-700 rounded relative">
      <AlertTriangle className="w-5 h-5 mr-2 mt-1" />
      <span className="flex-1 text-sm">{error}</span>
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-red-700 hover:text-red-900"
      >
        ×
      </button>
    </div>
  );
}

export default CompleteFields;
