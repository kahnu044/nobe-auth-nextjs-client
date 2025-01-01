import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Helper function to clear local storage and redirect
  const handleInvalidToken = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.replace("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      handleInvalidToken();
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
          handleInvalidToken();
          return;
        }

        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
      } catch (error) {
        console.error("Invalid token:", error.response?.data || error.message);
        handleInvalidToken();
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
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
