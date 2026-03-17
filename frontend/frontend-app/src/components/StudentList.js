import React from "react";
import { deleteStudent } from "../services/studentService";

function StudentList({ students, refreshStudents, setEditingStudent, showMessage }) {
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    try {
      await deleteStudent(id);
      refreshStudents();
      showMessage("success", "Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      showMessage("error", "Failed to delete student.");
    }
  };

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>No students found</h3>
        <p>No students available yet. Add your first student to get started.</p>
      </div>
    );
  }

  return (
    <>
      {students.map((student) => (
        <div key={student._id} className="list-card">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Level:</strong> {student.level}</p>

          <div className="list-actions">
            <button className="primary-btn" onClick={() => setEditingStudent(student)}>
              Edit
            </button>
            <button className="danger-btn" onClick={() => handleDelete(student._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default StudentList;