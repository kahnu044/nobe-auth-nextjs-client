import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Helper function to clear local storage and redirect
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.replace("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      handleLogout();
      return;
    }

    const validateToken = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            clientUrl: window.location.origin,
          },
        });

        const userData = response?.data?.user;
        if (!userData) {
          handleLogout();
          return;
        }

        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
      } catch (error) {
        console.error("Invalid token:", error.response?.data || error.message);
        handleLogout();
      }
    };

    validateToken();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {user ? (
        <>
          <p>Welcome back!</p>
          {user?.firstName && user?.lastName && (
            <>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-light px-4 py-2 mt-4 rounded-md font-bold"
              >
                Logout
              </button>
            </>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
