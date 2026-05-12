import axios from "axios";

const API_URL = "http://localhost:3000/courses";

export const getCourses = () => axios.get(API_URL);
export const getCourseById = (id) => axios.get(`${API_URL}/${id}`);
export const createCourse = (courseData) => axios.post(API_URL, courseData);
export const updateCourse = (id, courseData) => axios.put(`${API_URL}/${id}`, courseData);
export const deleteCourse = (id) => axios.delete(`${API_URL}/${id}`);