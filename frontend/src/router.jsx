

import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx";
import ErrorPage from "./pages/ErrorPages.jsx";
import UserDashboard from "./pages/Dashboard/UserDashboard.jsx";
import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
import UserList from "./pages/Dashboard/UserList.jsx";
import AdminSessions from "./pages/Dashboard/AdminSessions.jsx";
import AuditLogs from "./pages/Dashboard/AuditLogs.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        element: <ProtectedRoute role="user" />,
        children: [
          { path: "dashboard", element: <UserDashboard /> }
        ]
      },

      {
        element: <ProtectedRoute role="admin" />,
        children: [
          { path: "dashboard/admin", element: <AdminDashboard /> },
          {path:"/admin/users",element:<UserList/>},
          {path:"/admin/sessions",element:<AdminSessions/>},
           {path:"/admin/auditlogs",element:<AuditLogs/>},

        ]
        
      }
    ]
  }
]);
