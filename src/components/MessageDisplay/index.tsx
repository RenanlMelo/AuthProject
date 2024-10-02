import React, { useEffect, useState } from "react";
import { useLoginAuthContext } from "../../contexts/authLogin";
import { useNavigate } from "react-router-dom";

export const MessageDisplay = () => {
  const [loading, setLoading] = useState(true);
  const context = useLoginAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (context.signedIn === true) setLoading(false);
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <div>
      {loading ? (
        <div className="text-white text-2xl">Loading...</div>
      ) : (
        <div className="text-white flex justify-center flex-col items-center gap-4">
          <span className="text-3xl">User: {context.user?.email}</span>
          <button
            className="border border-white px-4 py-2"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
