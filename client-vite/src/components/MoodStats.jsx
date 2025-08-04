// src/components/MoodStats.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

const moodColors = {
  happy: "bg-yellow-300 text-yellow-900",
  sad: "bg-blue-300 text-blue-900",
  angry: "bg-red-300 text-red-900",
  neutral: "bg-gray-300 text-gray-900",
};

const moodEmojis = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  neutral: "😐",
};

const MoodStats = () => {
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [averageMood, setAverageMood] = useState("");
  const [commonMood, setCommonMood] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/journals");
      const sorted = res.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setEntries(sorted);
      computeStats(sorted);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  const computeStats = (entries) => {
    // Mood streak
    const dates = new Set(entries.map((e) => new Date(e.createdAt).toDateString()));
    let today = new Date();
    let streakCount = 0;

    while (dates.has(today.toDateString())) {
      streakCount++;
      today.setDate(today.getDate() - 1);
    }
    setStreak(streakCount);

    // Average mood (last 7 days)
    const moodScores = { happy: 3, neutral: 2, sad: 1, angry: 0 };
    const recent = entries.filter((e) => {
      const diff = (new Date() - new Date(e.createdAt)) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });

    if (recent.length > 0) {
      const total = recent.reduce((sum, e) => sum + (moodScores[e.mood] || 0), 0);
      const avg = total / recent.length;
      const moodByScore = Object.entries(moodScores).reduce((acc, [k, v]) => {
        acc[v] = k;
        return acc;
      }, {});
      setAverageMood(moodByScore[Math.round(avg)]);
    }

    // Most common mood
    const moodCount = {};
    for (let e of entries) {
      moodCount[e.mood] = (moodCount[e.mood] || 0) + 1;
    }
    const mostCommon = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0];
    setCommonMood(mostCommon?.[0]);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📆 Current Mood Streak</h2>
        <p className="text-4xl font-bold text-blue-600">{streak} Days</p>
        <p className="text-sm text-gray-500 mt-1">Consecutive days journaled</p>
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📈 Avg Mood (Last 7 Days)</h2>
        {averageMood ? (
          <div className={`inline-block px-3 py-2 rounded-lg text-lg font-bold ${moodColors[averageMood]}`}>
            {moodEmojis[averageMood]} {averageMood}
          </div>
        ) : (
          <p className="text-gray-500">Not enough data</p>
        )}
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">🏆 Most Common Mood</h2>
        {commonMood ? (
          <div className={`inline-block px-3 py-2 rounded-lg text-lg font-bold ${moodColors[commonMood]}`}>
            {moodEmojis[commonMood]} {commonMood}
          </div>
        ) : (
          <p className="text-gray-500">Not enough data</p>
        )}
      </div>
    </div>
  );
};

export default MoodStats;
