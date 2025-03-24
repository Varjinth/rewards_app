import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://varjinth.pythonanywhere.com/check-auth/", { withCredentials: true });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        await axios.post("https://varjinth.pythonanywhere.com/logout/", {}, { withCredentials: true });
        setIsAuthenticated(false);
        
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
