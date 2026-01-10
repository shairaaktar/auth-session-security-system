import { useState } from "react";
// import { loginUser } from "./auth.api";
import { useAuth } from "./auth.context";
import { useNavigate } from "react-router-dom";


const Login=()=>{
const { login } = useAuth();
const navigate=useNavigate()

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      console.log("login",res)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {error && <p>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );


}

export default Login