

import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/auth.context";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { adminUsers } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await adminUsers();

//       console.log("users", data);
//       setUsers(data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load users");
//     }
//   };
const fetchUsers = async () => {
  try {
    const data = await adminUsers();
    console.log("data",data)
    setUsers(data); // ✅ FIX

  } catch (err) {
    setError(err.response?.data?.error || "Failed to load users");
  }
};


  return (
    <div>
      <h2>Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.map((u) => (
        <div key={u._id}>
          {u.email} — {u.role}
        </div>
      ))}
    </div>
  );
};

export default UserList;
