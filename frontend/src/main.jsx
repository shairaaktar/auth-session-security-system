import React from "react";
import ReactDOM from "react-dom/client"

import { RouterProvider } from "react-router-dom";
import Providers from "./providers.jsx";
import { router } from "./router.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Providers>
    <AuthProvider>
       <RouterProvider router={router}/>

    </AuthProvider>
   
  </Providers>
)
