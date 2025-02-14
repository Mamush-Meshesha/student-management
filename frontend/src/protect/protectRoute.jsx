import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);

    if (decoded.role !== "STUDENT") {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
