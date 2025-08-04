import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import api from "../services/api";
import "./MoodHeatmap.css"; 

const MoodHeatmap = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get("/journals");
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching journals:", err);
      }
    };
    fetchEntries();
  }, []);

  // Map entries to heatmap format
  const heatmapValues = entries.map((entry) => ({
    date: new Date(entry.createdAt).toISOString().split("T")[0],
    mood: entry.mood,
  }));

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    return `color-${value.mood}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">🗓️ Mood Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={heatmapValues}
        classForValue={getClassForValue}
        showWeekdayLabels
      />
      <div className="flex gap-4 mt-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-300 rounded-sm"></div> Happy
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-300 rounded-sm"></div> Sad
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-300 rounded-sm"></div> Angry
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-300 rounded-sm"></div> Neutral
        </span>
      </div>
    </div>
  );
};

export default MoodHeatmap;
