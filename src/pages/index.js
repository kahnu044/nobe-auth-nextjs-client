import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  // Helper function to retrieve token
  const getAuthToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      return urlParams.get("token");
    }
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const authToken = getAuthToken();

    if (authToken) {
      setToken(authToken);
      localStorage.setItem("authToken", authToken);
      if (router.query.token) {
        router.replace("/dashboard");
      }
    }
  }, [router]);

  const handleLogin = () => {
    const clientUrl = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}?clientUrl=${clientUrl}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <img src="/noobauth.png" alt="NoobAuth" className="w-20 h-20 mb-10" />
      <h1 className="text-light text-lg md:text-3xl ">
        Welcome to <span className="text-[#748ef6]"> NoobAuth </span> Next.js
        Client App
      </h1>

      {!token ? (
        <>
          <button
            onClick={handleLogin}
            className="bg-[#748ef6] text-light px-2 py-1 mt-8 rounded-md "
          >
            <span className="flex items-center justify-center font-bold">
              <img
                src="/noobauth.png"
                alt="NoobAuth"
                className="w-10 h-10 mr-2"
              />
              Login with Noob Auth
            </span>
          </button>
        </>
      ) : (
        <>
          <p className="my-2">You are logged in!</p>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-light px-4 py-2 mt-4 rounded-md font-bold"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
