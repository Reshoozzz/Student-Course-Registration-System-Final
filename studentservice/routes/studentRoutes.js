const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/api/students", studentController.createStudent);
router.get("/api/students", studentController.getStudents);
router.get("/api/students/:id", studentController.getStudentById);
router.put("/api/students/:id", studentController.updateStudent);
router.delete("/api/students/:id", studentController.deleteStudent);

module.exports = router;