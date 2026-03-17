const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/api/courses", courseController.createCourse);
router.get("/api/courses", courseController.getCourses);
router.get("/api/courses/:id", courseController.getCourseById);
router.put("/api/courses/:id", courseController.updateCourse);
router.delete("/api/courses/:id", courseController.deleteCourse);

module.exports = router;