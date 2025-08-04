const Journal = require("../models/Journal");

// @desc    Create a new journal entry
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
  const { title, content, mood } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const journal = new Journal({
      user: req.user._id, // from authMiddleware
      title,
      content,
      mood,
    });

    const saved = await journal.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Journal Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc   Get all journals for logged-in user
// @route  GET /api/journals
// @access Private
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    console.error("Fetch Journals Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single journal by ID
// @route   GET /api/journals/:id
// @access  Private
const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    // Ensure the journal belongs to the logged-in user
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(journal);
  } catch (error) {
    console.error("Get Journal Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a journal by ID
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update" });
    }

    const { title, content, mood } = req.body;

    journal.title = title || journal.title;
    journal.content = content || journal.content;
    journal.mood = mood || journal.mood;

    const updatedJournal = await journal.save();
    res.status(200).json(updatedJournal);
  } catch (error) {
    console.error("Update Journal Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journals/:id
// @access  Private
// DELETE /api/journals/:id
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    // Check if the journal belongs to the logged-in user
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // ✅ Correct delete method
    await journal.deleteOne();

    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.error("Delete Journal Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = { 
    createJournal ,
    getJournals,
    getJournalById,
    updateJournal,
    deleteJournal,
};
