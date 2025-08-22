// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <div className="bg-light p-3" style={{ width: "200px" }}>
      <ul className="list-unstyled">
        {role === "user" && (
          <li>
            <Link to="/user">User Dashboard</Link>
          </li>
        )}
        {role === "owner" && (
          <li>
            <Link to="/owner">Owner Dashboard</Link>
          </li>
        )}
        {role === "admin" && (
          <>
            <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
