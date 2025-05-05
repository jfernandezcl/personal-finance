export const updateUserProfile = async (
  userId,
  username,
  email,
  phone,
  bio
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await fetch(
      `http://localhost:3001/api/auth/user/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone, bio }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};
