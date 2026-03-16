const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// Create course (simple, no admin auth for demo)
router.post("/", async (req, res) => {
  try {
    const { code, title, description, credits } = req.body;
    if (!code || !title) {
      return res.status(400).json({ message: "Code and title are required." });
    }
    const existing = await Course.findOne({ code });
    if (existing) {
      return res.status(409).json({ message: "Course code already exists." });
    }
    const course = new Course({ code, title, description, credits });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Get all courses
router.get("/", async (_req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Basic update course
router.put("/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Course not found." });
    }
    res.json(updated);
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Delete course
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found." });
    }
    res.json({ message: "Course deleted." });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;

