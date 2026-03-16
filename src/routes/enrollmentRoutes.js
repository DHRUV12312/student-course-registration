const express = require("express");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

// Enroll a student in a course
router.post("/", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    if (!studentId || !courseId) {
      return res.status(400).json({ message: "studentId and courseId are required." });
    }

    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();

    res.status(201).json({ message: "Enrollment successful.", enrollment });
  } catch (error) {
    console.error("Enroll error:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Student is already enrolled in this course." });
    }
    res.status(500).json({ message: "Server error." });
  }
});

// Get enrollments for a student
router.get("/student/:studentId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId }).populate("course");
    res.json(enrollments);
  } catch (error) {
    console.error("Get enrollments error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;

