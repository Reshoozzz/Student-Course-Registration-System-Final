import React, { useEffect, useState } from "react";
import { createStudent, updateStudent } from "../services/studentService";

function StudentForm({
  refreshStudents,
  editingStudent,
  clearEditingStudent,
  showMessage,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    level: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        password: editingStudent.password || "",
        department: editingStudent.department || "",
        level: editingStudent.level || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        level: "",
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.level.trim()) {
      showMessage("error", "Level is required.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      showMessage("error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
        showMessage("success", "Student updated successfully.");
        clearEditingStudent();
      } else {
        await createStudent(formData);
        showMessage("success", "Student added successfully.");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        level: "",
      });

      refreshStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      showMessage("error", error.response?.data?.message || "Failed to save student.");
    }
  };

  return (
    <div className="card">
      <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input type="text" name="level" placeholder="Academic Level" value={formData.level} onChange={handleChange} required />

        <div className="button-row">
          <button type="submit" className="primary-btn">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>

          {editingStudent && (
            <button type="button" className="secondary-btn" onClick={clearEditingStudent}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;