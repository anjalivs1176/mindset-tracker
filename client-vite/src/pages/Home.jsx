// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AffirmationPopup from "../components/AffirmationPopup";
import API from "../services/api";


const Home = () => {
  const navigate = useNavigate();
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchAffirmation = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const journalRes = await API.get("/journals");


      console.log("Journal response:", journalRes.data);

      if (!Array.isArray(journalRes.data)) {
        throw new Error("Invalid journals format");
      }

      const sorted = journalRes.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const latestMood = sorted[0]?.mood;
      console.log("Latest mood:", latestMood);

      if (!latestMood) {
        setAffirmation("No mood data found yet.");
        setLoading(false);
        return;
      }

      const affRes = await API.get(`/affirmation?mood=${latestMood}`);
      console.log("Affirmation response:", affRes.data);

      setAffirmation(affRes.data.affirmation || "No affirmation found.");
    } catch (error) {
      console.error("Error fetching affirmation:", error);
      setAffirmation("Unable to load affirmation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffirmation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🧠 Mindset Tracker</h1>

      {/* ✨ Affirmation Popup */}
      <AffirmationPopup affirmation={loading ? "Fetching affirmation..." : affirmation} />

      {/* 🔁 Refresh Affirmation Button */}
      <button
        onClick={fetchAffirmation}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-xl shadow-md text-sm font-semibold transition duration-200"
      >
        🔁 Refresh Affirmation
      </button>

      {/* 📘 Main Buttons */}
      <div className="space-y-4 w-full max-w-sm mt-10">
        <button
          onClick={() => navigate("/journal")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-medium shadow-md"
        >
          ➕ Create New Journal Entry
        </button>

        <button
          onClick={() => navigate("/entries")}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-medium shadow-md"
        >
          📚 View Past Entries
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl text-lg font-medium shadow-md"
        >
          📊 View Mood Analytics
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-medium shadow-md mt-6"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
