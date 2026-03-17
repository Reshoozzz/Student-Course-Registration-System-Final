import axios from "axios";

const API_URL = "http://localhost:5003/api/registrations";

export const getRegistrations = () => axios.get(API_URL);
export const createRegistration = (registrationData) => axios.post(API_URL, registrationData);
export const updateRegistration = (id, registrationData) => axios.put(`${API_URL}/${id}`, registrationData);
export const deleteRegistration = (id) => axios.delete(`${API_URL}/${id}`);
export const getRegistrationsByStudent = (studentId) =>
  axios.get(`${API_URL}/student/${studentId}`);