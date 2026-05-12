# Student Course Registration System

## Project Overview
The Student Course Registration System is a microservice-based web application developed using NestJS, React, and MongoDB Atlas. The system allows administrators to manage students, courses, and course registrations through a modern and responsive user interface.

This project was developed as part of the Service Oriented Architecture course to demonstrate the implementation of Microservices Architecture, API Gateway routing, NoSQL database integration, GitHub collaboration, and frontend-backend communication.

---

# Technologies Used

## Frontend
- React.js
- Axios
- CSS

## Backend
- NestJS
- Node.js
- Express.js

## Database
- MongoDB Atlas

## Tools
- Postman
- Git & GitHub
- VS Code

---

# System Architecture

The system follows a Microservices Architecture where each service is responsible for a specific functionality.

## Microservices
- Student Service
- Course Service
- Registration Service
- API Gateway

## Communication Flow

React Frontend  
↓  
API Gateway  
↓  
Microservices  
↓  
MongoDB Atlas

---

# Features

## Student Management
- Add new students
- Edit student information
- Delete students
- Search students

## Course Management
- Add new courses
- Edit course information
- Delete courses
- Search courses

## Registration Management
- Register students in courses
- Update registration status
- Delete registrations
- Filter registrations by semester and status

---

# API Gateway

All frontend API requests are routed through the API Gateway before reaching the corresponding microservice.

## Gateway Responsibilities
- Request routing
- Communication between frontend and microservices
- Centralized API access

---

# Database

MongoDB Atlas was used as the NoSQL database for this project.

## Why MongoDB?
- Flexible schema structure
- Easy integration with NestJS
- Scalable NoSQL database
- Suitable for microservices architecture

---

# API Endpoints

## Students
- GET /students
- POST /students
- PUT /students/:id
- DELETE /students/:id

## Courses
- GET /courses
- POST /courses
- PUT /courses/:id
- DELETE /courses/:id

## Registrations
- GET /registrations
- POST /registrations
- PUT /registrations/:id
- DELETE /registrations/:id

---

# Frontend Pages

- Dashboard
- Students Management
- Courses Management
- Registrations Management

---

# Testing

The system was tested using:
- Postman
- Frontend UI testing
- CRUD operation testing
- API Gateway routing testing

All services were tested successfully.

---

# GitHub Collaboration

GitHub was used for:
- Version control
- Team collaboration
- Branch management
- Project sharing

## Team Branches
- main
- student-service-branch
- course-service-branch
- registration-gateway-branch

---

# Project Structure

```txt
api-gateway
course-service
registration-service
student-service
frontend
postman
documentation