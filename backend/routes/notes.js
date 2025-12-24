const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ADD NOTE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const note = new Note({
      title,
      content,
      user: req.user.id
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET NOTES (user-wise)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE NOTE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
