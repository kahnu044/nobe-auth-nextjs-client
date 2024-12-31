import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {

    console.log("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);
    // Extract token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('token');

    if (authToken) {
      setToken(authToken);
      localStorage.setItem('authToken', authToken);
      router.push('/dashboard'); // Redirect to dashboard after successful login
    }
  }, []);

  const handleLogin = async () => {
    const clientUrl = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}?clientUrl=${clientUrl}`;
  };

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    setToken(null);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Welcome to Next.js Client App</h1>
      {!token ? (
        <>
          <button
            onClick={handleLogin}
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', fontSize: '16px' }}
          >
            Login with Noob Auth
          </button>
        </>
      ) : (
        <>
          <p>You are logged in!</p>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', fontSize: '16px' }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}