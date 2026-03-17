const axios = require("axios");
const Registration = require("../models/Registration");

const COURSE_SERVICE_URL = process.env.COURSE_SERVICE_URL || "http://localhost:5002";

const isValidSemester = (semester) => /^(Spring|Summer|Fall|Winter)\s\d{4}$/.test(semester);

const getCourseById = async (courseId) => {
  const response = await axios.get(`${COURSE_SERVICE_URL}/api/courses/${courseId}`);
  return response.data;
};

exports.createRegistration = async (req, res) => {
  try {
    const { studentId, courseId, semester, status } = req.body;

    if (!studentId || !courseId || !semester) {
      return res.status(400).json({
        message: "studentId, courseId, and semester are required.",
      });
    }

    if (!isValidSemester(semester)) {
      return res.status(400).json({
        message: "Semester must be in format like Spring 2026.",
      });
    }

    if (status && !["pending", "registered", "dropped"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const existingRegistration = await Registration.findOne({
      studentId,
      courseId,
      semester,
      status: { $ne: "dropped" },
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Duplicate registration is not allowed for the same student, course, and semester.",
      });
    }

    const course = await getCourseById(courseId);

    const currentCount = await Registration.countDocuments({
      courseId,
      semester,
      status: { $ne: "dropped" },
    });

    if (currentCount >= Number(course.capacity)) {
      return res.status(400).json({
        message: "Course capacity is full. Registration cannot be completed.",
      });
    }

    const registration = new Registration({
      studentId,
      courseId,
      semester,
      status: status || "pending",
    });

    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    console.error("Create registration error:", error.message);
    res.status(500).json({
      message: "Failed to create registration.",
      error: error.message,
    });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch registrations.",
      error: error.message,
    });
  }
};

exports.getRegistrationsByStudent = async (req, res) => {
  try {
    const registrations = await Registration.find({ studentId: req.params.studentId });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student registrations.",
      error: error.message,
    });
  }
};

exports.getRegistrationsByCourse = async (req, res) => {
  try {
    const registrations = await Registration.find({ courseId: req.params.courseId });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course registrations.",
      error: error.message,
    });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const { studentId, courseId, semester, status } = req.body;
    const registrationId = req.params.id;

    if (!studentId || !courseId || !semester) {
      return res.status(400).json({
        message: "studentId, courseId, and semester are required.",
      });
    }

    if (!isValidSemester(semester)) {
      return res.status(400).json({
        message: "Semester must be in format like Spring 2026.",
      });
    }

    if (!["pending", "registered", "dropped"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const duplicate = await Registration.findOne({
      _id: { $ne: registrationId },
      studentId,
      courseId,
      semester,
      status: { $ne: "dropped" },
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Duplicate registration is not allowed for the same student, course, and semester.",
      });
    }

    const course = await getCourseById(courseId);

    const currentCount = await Registration.countDocuments({
      _id: { $ne: registrationId },
      courseId,
      semester,
      status: { $ne: "dropped" },
    });

    if (status !== "dropped" && currentCount >= Number(course.capacity)) {
      return res.status(400).json({
        message: "Course capacity is full. Registration cannot be updated.",
      });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { studentId, courseId, semester, status },
      { new: true, runValidators: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found." });
    }

    res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error("Update registration error:", error.message);
    res.status(500).json({
      message: "Failed to update registration.",
      error: error.message,
    });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);

    if (!deletedRegistration) {
      return res.status(404).json({ message: "Registration not found." });
    }

    res.status(200).json({ message: "Registration deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete registration.",
      error: error.message,
    });
  }
};