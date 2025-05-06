export const changePasswordService = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "http://localhost:3001/api/auth/change-password",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error changing password");
  }
  return await response.json();
};
