import { Outlet } from "react-router";

import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center bg-base-200">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
