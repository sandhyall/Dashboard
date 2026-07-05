import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Common/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#EFEDE4]">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;