const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); 

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const journalRoutes = require("./routes/journalRoutes");
app.use("/api/journals", journalRoutes);

const affirmationRoutes = require("./routes/affirmationRoutes");
app.use("/api/affirmation", affirmationRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

