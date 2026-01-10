import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/auth.context";

const AuditLogs = () => {
  const { auditLogs } = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAuditLogs
  }, []);

   const fetchAuditLogs = async () => {
   try{
     const data = await auditLogs();
    console.log('data',data)
    setLogs(data);

   }catch(err){
    console.log("Error fetching Auditlogs:",err.response?.status);
   }
  };

  return (
    <div>
      <h3>Audit Logs</h3>

      {logs.map((log) => (
        <div key={log._id}>
          {log.userId?.email} — {log.action} —{" "}
          {new Date(log.createdAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default AuditLogs;
