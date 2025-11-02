import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContextProvider } from "buttered-toast";

import "./styles/main.css";

import AppRouter from "./routers/AppRouter";
import AuthProvider from "./providers/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastContextProvider>
        <AppRouter />
      </ToastContextProvider>
    </AuthProvider>
  </StrictMode>
);
