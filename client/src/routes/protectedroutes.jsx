import { Navigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import Loading from "../Pages/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAppContext();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
