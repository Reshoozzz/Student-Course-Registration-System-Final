import React, { useEffect, useState } from "react";
import { createCourse, updateCourse } from "../services/courseService";

function CourseForm({
  refreshCourses,
  editingCourse,
  clearEditingCourse,
  showMessage,
}) {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    instructor: "",
    creditHours: "",
    department: "",
    capacity: "",
    schedule: "",
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        courseCode: editingCourse.courseCode || "",
        courseName: editingCourse.courseName || "",
        instructor: editingCourse.instructor || "",
        creditHours: editingCourse.creditHours || "",
        department: editingCourse.department || "",
        capacity: editingCourse.capacity || "",
        schedule: editingCourse.schedule || "",
      });
    } else {
      setFormData({
        courseCode: "",
        courseName: "",
        instructor: "",
        creditHours: "",
        department: "",
        capacity: "",
        schedule: "",
      });
    }
  }, [editingCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (Number(formData.creditHours) <= 0) {
      showMessage("error", "Credit hours must be positive.");
      return false;
    }

    if (Number(formData.capacity) <= 0) {
      showMessage("error", "Capacity must be positive.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id, formData);
        showMessage("success", "Course updated successfully.");
        clearEditingCourse();
      } else {
        await createCourse(formData);
        showMessage("success", "Course added successfully.");
      }

      setFormData({
        courseCode: "",
        courseName: "",
        instructor: "",
        creditHours: "",
        department: "",
        capacity: "",
        schedule: "",
      });

      refreshCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      showMessage("error", error.response?.data?.message || "Failed to save course.");
    }
  };

  return (
    <div className="card">
      <h2>{editingCourse ? "Edit Course" : "Add New Course"}</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="courseCode" placeholder="Course Code" value={formData.courseCode} onChange={handleChange} required />
        <input type="text" name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} required />
        <input type="text" name="instructor" placeholder="Instructor Name" value={formData.instructor} onChange={handleChange} required />
        <input type="number" name="creditHours" placeholder="Credit Hours" value={formData.creditHours} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input type="number" name="capacity" placeholder="Course Capacity" value={formData.capacity} onChange={handleChange} required />
        <input type="text" name="schedule" placeholder="Schedule" value={formData.schedule} onChange={handleChange} required />

        <div className="button-row">
          <button type="submit" className="primary-btn">
            {editingCourse ? "Update Course" : "Add Course"}
          </button>

          {editingCourse && (
            <button type="button" className="secondary-btn" onClick={clearEditingCourse}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CourseForm;