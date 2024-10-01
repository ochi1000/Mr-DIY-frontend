import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const PrivateRoute = () => {
  const navigate = useNavigate();

  // Extract auth state from Redux store
  const { isAdmin, isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  // Combine authentication checks into a single useEffect
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAdmin === null || !isAuthenticated || !isAdmin) {
        navigate("/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [isAdmin, isAuthenticated, navigate]);

  // Render loading state or outlet based on authentication status
  if (loading) return <Loading />;

  // Check both isAdmin and isAuthenticated before rendering Outlet
  return <>{isAdmin && isAuthenticated ? <Outlet /> : null}</>;
};

export default PrivateRoute;
