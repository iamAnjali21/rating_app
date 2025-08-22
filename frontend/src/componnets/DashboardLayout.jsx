// src/components/DashboardLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      <Navbar
        isLoggedIn={!!user?.role}
        onLogout={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      />
      <div className="d-flex">
        <Sidebar role={user?.role} />
        <main className="flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
