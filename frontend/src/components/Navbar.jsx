import { useState } from "react";
// import { loginUser } from "./auth.api";
import { useAuth } from "../features/auth/auth.context";
import { useNavigate } from "react-router-dom";


const Navbar=()=>{
const { logout } = useAuth();
const navigate=useNavigate()

  

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav style={{ padding: "15px", background: "#eee" }}>
      <button onClick={submit}>Logout</button>
    </nav>
  );


}

export default Navbar