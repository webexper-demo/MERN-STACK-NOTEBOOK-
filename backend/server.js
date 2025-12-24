const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.use("/api/auth", authRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/notesapp")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
