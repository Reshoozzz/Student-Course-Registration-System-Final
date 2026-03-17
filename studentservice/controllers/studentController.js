const axios = require("axios");
const Student = require("../models/Student");

const REGISTRATION_SERVICE_URL =
  process.env.REGISTRATION_SERVICE_URL || "http://localhost:5003";

exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, department, level } = req.body;

    if (!name || !email || !password || !department || !level) {
      return res.status(400).json({ message: "All student fields are required." });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const student = new Student({ name, email, password, department, level });
    const savedStudent = await student.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to create student.", error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students.", error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student.", error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, email, password, department, level } = req.body;

    if (!name || !email || !password || !department || !level) {
      return res.status(400).json({ message: "All student fields are required." });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, password, department, level },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update student.", error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const registrationsResponse = await axios.get(
      `${REGISTRATION_SERVICE_URL}/api/registrations/student/${req.params.id}`
    );

    if (registrationsResponse.data.length > 0) {
      return res.status(400).json({
        message: "Cannot delete this student because they have related registrations.",
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student.", error: error.message });
  }
};