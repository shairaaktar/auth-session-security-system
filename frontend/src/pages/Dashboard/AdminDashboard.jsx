import DashboardLayout from "./DashboardLayout";
import UserList from "./UserList";
import api from "../../services/api";
import { Link } from "react-router-dom";
const AdminDashboard = () => {




  const revokeSessions=async()=>{

  }
  return (
    <DashboardLayout>
      <h2>Admin Dashboard</h2>

      <section>
        <h4>System Overview</h4>
        <ul>
          <li>Total Users</li>
          <li>Active Sessions</li>
          <li>Failed Logins</li>
        </ul>
      </section>

      <section>
        <h4>Admin Actions</h4>
       <Link to={`/admin/users`}>
        <button >View Users</button>
       </Link>
       <Link to={`/admin/sessions`}>
        <button >Active Users</button>
       </Link>
        <Link to={`/admin/auditlogs`}>
        <button >Audit Logs</button>
       </Link>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
