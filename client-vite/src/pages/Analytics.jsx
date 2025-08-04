// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import api from "../services/api";

const moodColors = {
  happy: "#FFD700",
  sad: "#87CEFA",
  neutral: "#C0C0C0",
  angry: "#FF6347",
  anxious: "#9370DB",
  excited: "#32CD32",
};

const Analytics = () => {
  const [entries, setEntries] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get("/journals");
        const sortedEntries = res.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setEntries(sortedEntries);
        prepareMoodData(sortedEntries);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
      }
    };

    fetchEntries();
  }, []);

  const prepareMoodData = (entries) => {
    const moodCount = {};
    entries.forEach((entry) => {
      const mood = entry.mood;
      moodCount[mood] = (moodCount[mood] || 0) + 1;
    });

    const pieData = Object.entries(moodCount).map(([mood, value]) => ({
      name: mood,
      value,
    }));

    setMoodData(pieData);
  };

  const lineChartData = entries.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString(),
    mood: entry.mood,
  }));

  const moodToNumber = {
    happy: 5,
    excited: 4,
    neutral: 3,
    anxious: 2,
    sad: 1,
    angry: 0,
  };

  const convertedLineData = lineChartData.map((item) => ({
    ...item,
    moodValue: moodToNumber[item.mood] || 0,
  }));

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#1A202C]">📈 Mood Analytics</h1>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/entries")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Entries
          </button>
          <button
            onClick={() => navigate("/journal")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Entry
          </button>
          <button
            onClick={() => navigate("/mood-stats")}
            className="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            View Mood Stats
          </button>
        </div>

        {/* Mood Over Time */}
        <div className="bg-white shadow rounded p-4 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Mood Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={convertedLineData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} tickFormatter={(val) => Object.keys(moodToNumber).find(key => moodToNumber[key] === val)} />
              <Tooltip formatter={(val, name) => name === 'moodValue' ? `Mood: ${Object.keys(moodToNumber).find(key => moodToNumber[key] === val)}` : val} />
              <Line type="monotone" dataKey="moodValue" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🎯 Mood Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={moodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {moodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={moodColors[entry.name] || "#8884d8"} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
