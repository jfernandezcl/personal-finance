export function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
