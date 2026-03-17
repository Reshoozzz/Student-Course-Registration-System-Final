const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Course Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(courseRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Course Service running on port ${PORT}`);
});