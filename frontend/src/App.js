// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./componnets/DashboardLayout";
import UserDashboard from "./dashboard/UserDashboard";
import OwnerDashboard from "./dashboard/OwnerDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import Login from "./componnets/Login";
import Signup from "./componnets/Signup";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user?.role) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/user" element={<ProtectedRoute role="user">
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/owner" element={
            <ProtectedRoute role="owner">
              <DashboardLayout>
                <OwnerDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/admin"element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
