const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");

router.post("/api/registrations", registrationController.createRegistration);
router.get("/api/registrations", registrationController.getRegistrations);
router.get("/api/registrations/student/:studentId", registrationController.getRegistrationsByStudent);
router.get("/api/registrations/course/:courseId", registrationController.getRegistrationsByCourse);
router.put("/api/registrations/:id", registrationController.updateRegistration);
router.delete("/api/registrations/:id", registrationController.deleteRegistration);

module.exports = router;