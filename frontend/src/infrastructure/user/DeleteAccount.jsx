function DeleteAccount() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    console.log("Token que se envía al backend:", token);
    try {
      const response = await fetch("http://localhost:3001/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        handleLogout();
      } else {
        const errorData = await response.json();
        alert(`Error deleting account: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while trying to delete your account.");
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Eliminar cuenta
      </button>
    </div>
  );
}

export default DeleteAccount;
