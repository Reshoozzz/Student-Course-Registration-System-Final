import React, { useEffect, useState } from "react";
import { deleteRegistration } from "../services/registrationService";
import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";

function RegistrationList({
  registrations,
  refreshRegistrations,
  setEditingRegistration,
  showMessage,
}) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchStudentsAndCourses();
  }, []);

  const fetchStudentsAndCourses = async () => {
    try {
      const studentsRes = await getStudents();
      const coursesRes = await getCourses();

      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error loading students or courses:", error);
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find((s) => s._id === studentId);
    return student ? student.name : studentId;
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    return course ? `${course.code} - ${course.name}` : courseId;
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this registration?");
    if (!confirmed) return;

    try {
      await deleteRegistration(id);
      refreshRegistrations();
      showMessage("success", "Registration deleted successfully.");
    } catch (error) {
      console.error("Error deleting registration:", error);
      showMessage("error", "Failed to delete registration.");
    }
  };

  const getStatusClass = (status) => {
    if (status === "registered") return "badge badge-registered";
    if (status === "pending") return "badge badge-pending";
    if (status === "dropped") return "badge badge-dropped";
    return "badge";
  };

  if (registrations.length === 0) {
    return (
      <div className="empty-state">
        <h3>No registrations found</h3>
        <p>No registrations available yet. Add your first registration to get started.</p>
      </div>
    );
  }

  return (
    <>
      {registrations.map((reg) => (
        <div key={reg._id} className="list-card">
          <p>
            <strong>Student:</strong> {getStudentName(reg.studentId)}
          </p>

          <p>
            <strong>Course:</strong> {getCourseName(reg.courseId)}
          </p>

          <p>
            <strong>Semester:</strong> {reg.semester}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={getStatusClass(reg.status)}>{reg.status}</span>
          </p>

          <div className="list-actions">
            <button className="primary-btn" onClick={() => setEditingRegistration(reg)}>
              Edit
            </button>

            <button className="danger-btn" onClick={() => handleDelete(reg._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default RegistrationList;