import { Navigate } from "react-router";
import { userStore } from "../stores/UserStore";


function ProtectedRoute({ children}) {

  if (!userStore.currentUserId) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;