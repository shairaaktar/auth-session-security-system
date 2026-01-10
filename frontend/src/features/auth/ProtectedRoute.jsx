// import {Navigate} from "react-router-dom"
// import {useAuth} from "./auth.context";


// const ProtectdRoute=({children,role})=>{
//     const {user}=useAuth();

//    if (!user) return <Navigate to="/login" />;

//   if (role && user.role !== role)
//     return <Navigate to="/unauthorized" />;

//   return children;


// }

// export default ProtectdRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.context";

const ProtectedRoute = ({children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute:", { user, loading });


  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
