import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Journal = () => {
  const [form, setForm] = useState({ title: "", content: "", mood: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.content.trim()) errors.content = "Content is required";
    if (!form.mood) errors.mood = "Please select a mood";
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await api.post("/journals", form);
      setForm({ title: "", content: "", mood: "" });
      navigate("/entries");
    } catch (err) {
      console.error("Create Journal Error:", err);
      alert("Failed to create journal entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 sm:p-8 flex flex-col items-center">
      {/* Header + Button Container */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1A202C] mb-4 sm:mb-0 text-center sm:text-left">
          📝 Reflect & Write
        </h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-md"
        >
          🏠 Home
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-6 py-8 w-full max-w-3xl space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              error.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              error.content ? "border-red-500" : "border-gray-300"
            }`}
            rows={5}
          />
          {error.content && <p className="text-red-500 text-sm">{error.content}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Mood</label>
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              error.mood ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😡 Angry</option>
            <option value="neutral">😐 Neutral</option>
          </select>
          {error.mood && <p className="text-red-500 text-sm">{error.mood}</p>}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-2 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/entries")}
            className="w-full sm:w-auto px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            See Entries
          </button>
        </div>
      </form>
    </div>
  );
};

export default Journal;
