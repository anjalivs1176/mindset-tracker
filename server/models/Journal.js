const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    mood: {
    type: String,
    enum: ["happy", "sad", "neutral", "angry", "excited", "calm"],
    required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
