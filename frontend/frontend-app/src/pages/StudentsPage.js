import React, { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { getStudents } from "../services/studentService";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage({ type: "error", text: "Failed to load students." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const clearEditingStudent = () => {
    setEditingStudent(null);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const filteredStudents = students.filter((student) =>
    (student.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Students Management</h1>
      <p className="page-subtitle">
        Add, update, and manage student records in the system.
      </p>

      {message.text && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
          {message.text}
        </div>
      )}

      <div className="section-grid">
        <StudentForm
          refreshStudents={fetchStudents}
          editingStudent={editingStudent}
          clearEditingStudent={clearEditingStudent}
          showMessage={showMessage}
        />

        <div className="card">
          <h2>Students List</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p className="empty-text">Loading students...</p>
          ) : (
            <StudentList
              students={filteredStudents}
              refreshStudents={fetchStudents}
              setEditingStudent={setEditingStudent}
              showMessage={showMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;