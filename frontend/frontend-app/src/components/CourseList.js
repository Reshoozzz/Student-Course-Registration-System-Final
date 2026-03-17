import React from "react";
import { deleteCourse } from "../services/courseService";

function CourseList({ courses, refreshCourses, setEditingCourse, showMessage }) {
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      await deleteCourse(id);
      refreshCourses();
      showMessage("success", "Course deleted successfully.");
    } catch (error) {
      console.error("Error deleting course:", error);
      showMessage("error", "Failed to delete course.");
    }
  };

  if (courses.length === 0) {
    return (
      <div className="empty-state">
        <h3>No courses found</h3>
        <p>No courses available yet. Add your first course to get started.</p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <div key={course._id} className="list-card">
          <p><strong>Course Code:</strong> {course.courseCode}</p>
          <p><strong>Course Name:</strong> {course.courseName}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Credit Hours:</strong> {course.creditHours}</p>
          <p><strong>Department:</strong> {course.department}</p>
          <p><strong>Capacity:</strong> {course.capacity}</p>
          <p><strong>Schedule:</strong> {course.schedule}</p>

          <div className="list-actions">
            <button className="primary-btn" onClick={() => setEditingCourse(course)}>
              Edit
            </button>
            <button className="danger-btn" onClick={() => handleDelete(course._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CourseList;