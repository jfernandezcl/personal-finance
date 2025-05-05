import { useEffect, useState } from "react";

export default function ProfileUserName() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storeUsername = localStorage.getItem("username");
    const storeEmail = localStorage.getItem("email");

    if (storeUsername) setUsername(storeUsername);
    if (storeEmail) setEmail(storeEmail);
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-300 text-[#025963] font-bold rounded-full text-3xl">
            {username ? getInitials(username) : "??"}
          </div>

          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
              {username}
            </h4>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
