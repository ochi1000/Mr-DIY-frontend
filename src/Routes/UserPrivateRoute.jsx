/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import toast from "react-hot-toast";

const UserPrivateRoute = () => {
  const navigate = useNavigate();

  // Extract auth state from Redux store

  const { userIsAuthenticated, currentauthUser } = useSelector(
    (state) => state.userauth
  );

  const [loading, setLoading] = useState(true);

  // Combine authentication checks into a single useEffect
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!userIsAuthenticated) {
        // toast.error("You're not authenticated yet. Please login first.");
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [userIsAuthenticated, navigate]);

  // Render loading state or outlet based on authentication status
  if (loading) return <Loading />;

  // Check userIsAuthenticated before rendering Outlet
  return <>{userIsAuthenticated ? <Outlet /> : null}</>;
};

export default UserPrivateRoute;
