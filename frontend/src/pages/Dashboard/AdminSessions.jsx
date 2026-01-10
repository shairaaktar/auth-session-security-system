import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/auth.context";

const AdminSessions = () => {
  const { adminSessions, forceLogout } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
   try{
     const data = await adminSessions();
    console.log('data',data)
    setSessions(data);

   }catch(err){
    console.log("Session fetch blocked:",err.response?.status);
   }
  };

  const revoke = async (userId) => {
    await forceLogout(userId);
    loadSessions();
  };

  return (
    <div>
      <h3>Active Sessions</h3>

      {sessions.map((s) => (
        <div key={s._id}>
          {s.email}
          <button onClick={() => revoke(s.userId)}>
            Force Logout
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminSessions;
