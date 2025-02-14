import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PublicRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "STUDENT") {
        return <Navigate to="/home" replace />;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // Clear invalid token
    }
  }

  return <Outlet />; // Allow access to login page
}

export default PublicRoute;
