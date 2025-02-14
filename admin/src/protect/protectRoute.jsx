
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);

    if (decoded.role !== "ADMIN") {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;


