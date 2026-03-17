const axios = require("axios");
const Course = require("../models/Course");

const REGISTRATION_SERVICE_URL =
  process.env.REGISTRATION_SERVICE_URL || "http://localhost:5003";

exports.createCourse = async (req, res) => {
  try {
    const { courseCode, courseName, instructor, creditHours, department, capacity, schedule } =
      req.body;

    if (
      !courseCode ||
      !courseName ||
      !instructor ||
      !creditHours ||
      !department ||
      !capacity ||
      !schedule
    ) {
      return res.status(400).json({ message: "All course fields are required." });
    }

    if (Number(creditHours) <= 0) {
      return res.status(400).json({ message: "Credit hours must be positive." });
    }

    if (Number(capacity) <= 0) {
      return res.status(400).json({ message: "Capacity must be positive." });
    }

    const course = new Course({
      courseCode,
      courseName,
      instructor,
      creditHours,
      department,
      capacity,
      schedule,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course.", error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses.", error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course.", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseCode, courseName, instructor, creditHours, department, capacity, schedule } =
      req.body;

    if (
      !courseCode ||
      !courseName ||
      !instructor ||
      !creditHours ||
      !department ||
      !capacity ||
      !schedule
    ) {
      return res.status(400).json({ message: "All course fields are required." });
    }

    if (Number(creditHours) <= 0) {
      return res.status(400).json({ message: "Credit hours must be positive." });
    }

    if (Number(capacity) <= 0) {
      return res.status(400).json({ message: "Capacity must be positive." });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        courseCode,
        courseName,
        instructor,
        creditHours,
        department,
        capacity,
        schedule,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course.", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const registrationsResponse = await axios.get(
      `${REGISTRATION_SERVICE_URL}/api/registrations/course/${req.params.id}`
    );

    if (registrationsResponse.data.length > 0) {
      return res.status(400).json({
        message: "Cannot delete this course because it has related registrations.",
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course.", error: error.message });
  }
};