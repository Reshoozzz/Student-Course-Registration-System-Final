import React, { useEffect, useState } from "react";
import { createRegistration, updateRegistration } from "../services/registrationService";
import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";

function RegistrationForm({
  refreshRegistrations,
  editingRegistration,
  clearEditingRegistration,
  showMessage,
}) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    semester: "",
    status: "pending",
  });

  useEffect(() => {
    fetchStudentsAndCourses();
  }, []);

  useEffect(() => {
    if (editingRegistration) {
      setFormData({
        studentId: editingRegistration.studentId || "",
        courseId: editingRegistration.courseId || "",
        semester: editingRegistration.semester || "",
        status: editingRegistration.status || "pending",
      });
    } else {
      setFormData({
        studentId: "",
        courseId: "",
        semester: "",
        status: "pending",
      });
    }
  }, [editingRegistration]);

  const fetchStudentsAndCourses = async () => {
    try {
      const studentsRes = await getStudents();
      const coursesRes = await getCourses();
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error loading students or courses:", error);
      showMessage("error", "Failed to load students or courses.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const semesterRegex = /^(Spring|Summer|Fall|Winter)\s\d{4}$/;

    if (!semesterRegex.test(formData.semester)) {
      showMessage("error", "Semester must be like Spring 2026.");
      return false;
    }

    if (!["pending", "registered", "dropped"].includes(formData.status)) {
      showMessage("error", "Invalid registration status.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingRegistration) {
        await updateRegistration(editingRegistration._id, formData);
        showMessage("success", "Registration updated successfully.");
        clearEditingRegistration();
      } else {
        await createRegistration(formData);
        showMessage("success", "Registration added successfully.");
      }

      setFormData({
        studentId: "",
        courseId: "",
        semester: "",
        status: "pending",
      });

      refreshRegistrations();
    } catch (error) {
      console.error("Error saving registration:", error);
      showMessage("error", error.response?.data?.message || "Failed to save registration.");
    }
  };

  return (
    <div className="card">
      <h2>{editingRegistration ? "Edit Registration" : "Add New Registration"}</h2>

      <form onSubmit={handleSubmit}>
        <select name="studentId" value={formData.studentId} onChange={handleChange} required>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>

        <select name="courseId" value={formData.courseId} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="semester"
          placeholder="Semester (Example: Spring 2026)"
          value={formData.semester}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="registered">Registered</option>
          <option value="dropped">Dropped</option>
        </select>

        <div className="button-row">
          <button type="submit" className="primary-btn">
            {editingRegistration ? "Update Registration" : "Add Registration"}
          </button>

          {editingRegistration && (
            <button type="button" className="secondary-btn" onClick={clearEditingRegistration}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;