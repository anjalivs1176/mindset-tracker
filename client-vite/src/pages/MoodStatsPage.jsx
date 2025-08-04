// src/pages/MoodStatsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MoodStats from "../components/MoodStats";
import MoodHeatmap from "../components/MoodHeatmap";

const MoodStatsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/analytics")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            ← Back to Analytics
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Home
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📊 Mood Streaks & Reflection Stats
        </h1>
        <MoodStats />
        <MoodHeatmap />
      </div>
    </div>
  );
};

export default MoodStatsPage;
