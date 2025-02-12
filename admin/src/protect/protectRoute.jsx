// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const isAuth = useSelector((state) => state.auth.isAuth);

//   return isAuth ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import {jwtDecode} from "jwt-decode";

// const ProtectedRoute = ({ children }) => {
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//       const token = Cookies.get("jwt"); 
//       console.log("this is token decoded",token)

//     if (token) {
//       try {
//         const decoded = jwtDecode(token); 
//         if (decoded.role === "ADMIN") {
//             setIsAuthorized(true);
//             console.log(decoded.role)
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     }
//   }, []);

//   return isAuthorized ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwt"); // Get token from cookies

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token); // Decode token
    if (decoded.role !== "ADMIN") {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;


