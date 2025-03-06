/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, redirect = "/login", role }) => {
  if (!user) return <Navigate to={redirect} replace />;

  if (role && user.role !== role)
    return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
