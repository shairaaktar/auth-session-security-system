import { useState } from "react";

import { authApi } from "./auth.api.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.context.jsx";

const Register=()=>{
    const [form,setForm]=useState({email:"",password:""});
    const [success,setSuccess]=useState(false)
    const {register}=useAuth()
   const navigate=useNavigate();


    const submit=async(e)=>{
        e.preventDefault();
        try{
             await register(form)
        setSuccess(true);
        
navigate("/");
            
        }catch(err){
            alert("Registration failed");

        }
       
    }

    if(success) return <p>Register Successful</p>;

    return (
        <form onSubmit={submit}>
            <h2>Register</h2>

           <input 
           placeholder="Email"
           onChange={(e)=>setForm({...form,email:e.target.value})}
           />
           <input
           type="password"
           placeholder="Password"
           onChange={(e) => setForm({ ...form, password: e.target.value })}
           
           />

            <button type="submit">Register</button>
        </form>
    )

}

export default Register;