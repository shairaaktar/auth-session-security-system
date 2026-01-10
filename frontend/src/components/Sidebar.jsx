import { useAuth } from "../features/auth/auth.context";


const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside style={{ width: "220px", background: "#111", color: "#fff", padding: "20px" }}>
      <h3>Dashboard</h3>

      {user?.role === "user" && (
        <>
          <p> My Profile</p>
          <p> Sessions</p>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <p> Analytics</p>
          <p> Users</p>
          <p> Logs</p>
        </>
      )}
    </aside>
  );
};

export default Sidebar;