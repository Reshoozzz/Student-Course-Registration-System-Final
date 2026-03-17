const Course = require("../models/Courses");

const createCourse = async (data) => {
  return await Course.create(data);
};

const getAllCourses = async () => {
  return await Course.find();
};

const getCourseById = async (id) => {
  return await Course.findById(id);
};

const updateCourse = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};