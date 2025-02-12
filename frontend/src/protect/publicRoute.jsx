import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("jwt");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "STUDENT") {
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return children;
};

export default PublicRoute;
