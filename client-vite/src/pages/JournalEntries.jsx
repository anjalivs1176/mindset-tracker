// src/pages/JournalEntries.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const JournalEntries = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedEntry, setEditedEntry] = useState({ title: "", content: "", mood: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/journals");
      setEntries(res.data);
      setFilteredEntries(res.data);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(term) ||
        entry.content.toLowerCase().includes(term)
    );
    setFilteredEntries(filtered);
  }, [searchTerm, entries]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this journal entry?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/journals/${id}`);
      fetchEntries();
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setEditedEntry({ title: entry.title, content: entry.content, mood: entry.mood });
  };

  const handleEditSave = async (id) => {
    try {
      await api.put(`/journals/${id}`, editedEntry);
      setEditingId(null);
      fetchEntries();
    } catch (err) {
      console.error("Error updating entry:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1A202C]">
          📚 Your Journal Entries
        </h1>

        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/journal")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Journal
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Home
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title or content..."
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredEntries.length === 0 ? (
          <p className="text-gray-500 text-center">No entries found.</p>
        ) : (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <div key={entry._id} className="bg-white shadow-md p-4 rounded-md">
                {editingId === entry._id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedEntry.title}
                      onChange={(e) =>
                        setEditedEntry({ ...editedEntry, title: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <textarea
                      value={editedEntry.content}
                      onChange={(e) =>
                        setEditedEntry({ ...editedEntry, content: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <select
                      value={editedEntry.mood}
                      onChange={(e) =>
                        setEditedEntry({ ...editedEntry, mood: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Mood</option>
                      <option value="happy">Happy</option>
                      <option value="sad">Sad</option>
                      <option value="angry">Angry</option>
                      <option value="neutral">Neutral</option>
                    </select>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEditSave(entry._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800">{entry.title}</h2>
                    <p className="text-gray-700 mt-1 break-words whitespace-pre-wrap">
                      {entry.content}
                    </p>
                    <p className="text-sm mt-2 text-gray-500">
                      Mood: {entry.mood} | {new Date(entry.createdAt).toLocaleString()}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => handleEditClick(entry)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntries;
