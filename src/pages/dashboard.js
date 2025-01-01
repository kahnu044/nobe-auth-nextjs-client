import React, { useState, useEffect } from "react";
import axios from "axios";

function dashboard() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(token){
        setToken(token);
    }

    // if (token) {
    //   axios
    //     .get("http://auth.example.com/validate", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     .then((response) => {
    //       setUser(response.data.user);
    //     })
    //     .catch((err) => {
    //       console.error("Invalid token:", err);
    //       localStorage.removeItem("authToken");
    //       window.location.href = "/";
    //     });
    // } else {
    //   window.location.href = "/";
    // }
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {token ? (
        <>
          <p>
            Welcome back!
          </p>
          <p>Name : </p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
    );
}

export default dashboard;
