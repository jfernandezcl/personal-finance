export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await fetch("http://localhost:3001/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error in obtaining user profile");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};
