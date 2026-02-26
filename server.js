const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_nancy,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {

    console.log("Connected to MySQL");
  }
});

// API to store contact form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Message saved successfully");
    }
  });
});

const PORT = process.env.PORT || 5000;


app.listen(process.env.PORT, () => {
  console.log("Server is running on Render");
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.static("frontend"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});


password:""



