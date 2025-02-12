import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
