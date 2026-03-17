const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Student Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(studentRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Student Service running on port ${PORT}`);
});