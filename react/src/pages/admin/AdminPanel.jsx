import React, { useContext, useEffect } from "react";
import UserContext from "../../UserContext";
import { Navigate, Routes, Route } from "react-router-dom";
import AdminDashboard from "./a-dashboard";
import ManageUsers from "./a-events";
import ManageEvents from "./a-events";

const AdminPanel = () => {
  const [user] = useContext(UserContext);

  // Check if the user is an admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

    // Check if the user is an admin
    if (!user || user.role !== "1") {
      return <Navigate to="/auth/login" replace />;
    }

 return (
<div className="p-6 bg-gray-100">
  <h1 className="text-2xl font-bold">Admin Panel</h1>
  <nav className="flex gap-4 mt-4">
    <Link to="/admin/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
    <Link to="/admin/users" className="text-blue-500 hover:underline">Manage Users</Link>
    <Link to="/admin/products" className="text-blue-500 hover:underline">Manage Products</Link>
  </nav>

  <Routes>
    <Route path="/dashboard" element={<AdminDashboard />} />
    <Route path="/users" element={<ManageUsers />} />
    <Route path="/events" element={<ManageEvents />} />
  </Routes>
</div>
  );
};

export default AdminPanel;