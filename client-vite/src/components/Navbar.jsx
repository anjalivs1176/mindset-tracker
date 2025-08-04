// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div
        onClick={() => navigate("/home")}
        className="text-xl font-bold cursor-pointer tracking-wide"
      >
        🧠 MindMirror
      </div>
      <div className="space-x-4">
        <button onClick={() => navigate("/home")} className="hover:underline">Home</button>
        <button onClick={() => navigate("/journal")} className="hover:underline">Journal</button>
        <button onClick={() => navigate("/entries")} className="hover:underline">Entries</button>
        <button onClick={() => navigate("/mood-analytics")} className="hover:underline">Mood</button>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
