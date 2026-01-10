import { Children } from "react";
import { AuthProvider } from "./features/auth/auth.context";

const Providers=({children})=>{
    return <AuthProvider>{children}</AuthProvider>
}

export default Providers