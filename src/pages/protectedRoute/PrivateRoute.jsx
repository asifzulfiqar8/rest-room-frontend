import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProfile } from "../../redux/reducers/authSlice";

const ProtectedRoute = ({ element }) => {
  const profile = useSelector(selectProfile);
  console.log("Protected Profile", profile);

  if (!profile) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
