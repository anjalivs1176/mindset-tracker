// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Journal from "./pages/Journal";
import JournalEntries from "./pages/JournalEntries";
import Analytics from "./pages/Analytics";
import MoodStatsPage from "./pages/MoodStatsPage";

function App() {
  return (
  <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
    <Route path="/journal" element={<Journal />} />
    <Route path="/entries" element={<JournalEntries />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/mood-stats" element={<MoodStatsPage />} />

  </Routes>
  );
}

export default App;
