import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";
import { getRegistrations } from "../services/registrationService";

function DashboardPage() {
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const studentsRes = await getStudents();
      const coursesRes = await getCourses();
      const registrationsRes = await getRegistrations();

      setStudentCount(studentsRes.data.length);
      setCourseCount(coursesRes.data.length);
      setRegistrationCount(registrationsRes.data.length);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Overview of students, courses, and course registrations.
      </p>

      <div className="dashboard-grid">
        <div className="summary-card">
          <div className="summary-label">Total Students</div>
          <div className="summary-number">{studentCount}</div>
          <div className="summary-text">
            Students currently stored in the system
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Total Courses</div>
          <div className="summary-number">{courseCount}</div>
          <div className="summary-text">
            Courses available for registration
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-label">Total Registrations</div>
          <div className="summary-number">{registrationCount}</div>
          <div className="summary-text">
            Active registration records in the system
          </div>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <div className="card">
          <h2>Quick Actions</h2>
          <p className="dashboard-card-text">
            Use these shortcuts to manage the main parts of the system.
          </p>

          <div className="quick-actions">
            <Link to="/students" className="quick-action-btn">
              Manage Students
            </Link>

            <Link to="/courses" className="quick-action-btn">
              Manage Courses
            </Link>

            <Link to="/registrations" className="quick-action-btn">
              Manage Registrations
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>System Overview</h2>
          <div className="overview-list">
            <div className="overview-item">
              <span>Frontend</span>
              <strong>React</strong>
            </div>

            <div className="overview-item">
              <span>Backend</span>
              <strong>NestJS Microservices</strong>
            </div>

            <div className="overview-item">
              <span>Database</span>
              <strong>MongoDB Atlas</strong>
            </div>

            <div className="overview-item">
              <span>Architecture</span>
              <strong>Microservices + API Gateway</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;