import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// const PublicRoute = ({ children }) => {
//   const token = Cookies.get("jwt");

//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.role === "ADMIN") {
//         return <Navigate to="/" replace />;
//       }
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   }

//   return children;
function PublicRoute() {
  const token = Cookies.get("jwt");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "ADMIN") {
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove("jwt"); // Clear invalid token
    }
  }

  return <Outlet />; // Allow access to login page
}

export default PublicRoute;
