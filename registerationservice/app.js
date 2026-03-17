const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const registrationRoutes = require("./routes/registrationRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Registration Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(registrationRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Registration Service running on port ${PORT}`);
});