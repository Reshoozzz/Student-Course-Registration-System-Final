import React, { useEffect, useState } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import { getCourses } from "../services/courseService";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage({ type: "error", text: "Failed to load courses." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const clearEditingCourse = () => {
    setEditingCourse(null);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Courses Management</h1>
      <p className="page-subtitle">
        Add, update, and manage university course information.
      </p>

      {message.text && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
          {message.text}
        </div>
      )}

      <div className="section-grid">
        <CourseForm
          refreshCourses={fetchCourses}
          editingCourse={editingCourse}
          clearEditingCourse={clearEditingCourse}
          showMessage={showMessage}
        />

        <div className="card">
          <h2>Courses List</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search courses by code or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p className="empty-text">Loading courses...</p>
          ) : (
            <CourseList
              courses={filteredCourses}
              refreshCourses={fetchCourses}
              setEditingCourse={setEditingCourse}
              showMessage={showMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;