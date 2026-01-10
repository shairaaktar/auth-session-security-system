import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../features/auth/auth.context";


const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h2>Welcome, {user?.email}</h2>

      <section>
        <h4>Account Info</h4>
        <p>Role: {user?.role}</p>
        <p>User ID: {user?._id}</p>
      </section>

      <section>
        <h4>Security</h4>
        <p>Failed login attempts: {user?.failedLoginAttempts}</p>
        <p>Account lock: {user?.lockUntil ? "Locked" : "Active"}</p>
      </section>
    </DashboardLayout>
  );
};

export default UserDashboard