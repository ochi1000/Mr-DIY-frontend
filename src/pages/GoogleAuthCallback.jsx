import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const GoogleAuthCallback = () => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // Get the authorization code or token from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get("token"); // Assuming the token is returned in the URL as 'token'

        if (token) {
          // Make a GET request to fetch user data based on the token
          const response = await axios.get(
            `https://phplaravel-1329305-4863390.cloudwaysapps.com/auth/google/callback?token=${token}`
          );

          // Set the user data in the state
          setAuthData(response.data);
          // You can store the token for authentication in localStorage or state management
          localStorage.setItem("authToken", response.data.data.token);
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, [location]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {authData && (
        <>
          <h1>Welcome, {authData.data.user.first_name}!</h1>
          <p>Email: {authData.data.user.email}</p>
          <img src={authData.data.user.img} alt="User avatar" />
        </>
      )}
    </div>
  );
};

export default GoogleAuthCallback;
