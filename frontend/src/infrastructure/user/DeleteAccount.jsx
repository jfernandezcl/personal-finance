import { useState } from "react";

function DeleteAccount() {
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleLogout();
      } else {
        await response.json();
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete account
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">
              This action will permanently delete your account.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete account
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
