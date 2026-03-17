import React, { useEffect, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationList from "../components/RegistrationList";
import { getRegistrations } from "../services/registrationService";

function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await getRegistrations();
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to load registrations.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const clearEditingRegistration = () => {
    setEditingRegistration(null);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });

    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesStatus = statusFilter ? reg.status === statusFilter : true;
    const matchesSemester = semesterFilter
      ? reg.semester.toLowerCase().includes(semesterFilter.toLowerCase())
      : true;

    return matchesStatus && matchesSemester;
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Course Registrations</h1>
      <p className="page-subtitle">
        Register students in courses and manage semester registration records.
      </p>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="section-grid">
        <RegistrationForm
          refreshRegistrations={fetchRegistrations}
          editingRegistration={editingRegistration}
          clearEditingRegistration={clearEditingRegistration}
          showMessage={showMessage}
        />

        <div className="card">
          <h2>Registrations List</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Filter by semester..."
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          />

          <select
            className="search-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="registered">Registered</option>
            <option value="dropped">Dropped</option>
          </select>

          {loading ? (
            <p className="empty-text">Loading registrations...</p>
          ) : (
            <RegistrationList
              registrations={filteredRegistrations}
              refreshRegistrations={fetchRegistrations}
              setEditingRegistration={setEditingRegistration}
              showMessage={showMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationsPage;