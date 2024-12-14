const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from "public" folder

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dns_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Register (Add) DNS Entry
app.post("/register", (req, res) => {
  const { domain, ip, ipClass } = req.body;

  const query =
    "INSERT INTO dns_entries (domain, ip, ipClass) VALUES (?, ?, ?)";
  db.query(query, [domain, ip, ipClass], (err, result) => {
    if (err) {
      console.error("Error adding DNS record:", err);
      res.status(500).send("Error adding DNS record");
    } else {
      console.log("DNS record added:", result);
      res.send("DNS record added successfully");
    }
  });
});

// Resolve (Validate) DNS Entry
app.get("/resolve", (req, res) => {
  const { domain, ip } = req.query;

  const query = "SELECT * FROM dns_entries WHERE domain = ? AND ip = ?";
  db.query(query, [domain, ip], (err, result) => {
    if (err) {
      console.error("Error resolving DNS record:", err);
      res.status(500).send("Error resolving DNS record");
    } else if (result.length > 0) {
      res.send("DNS record found");
    } else {
      res.send("DNS record not found");
    }
  });
});

// Delete DNS Entry
app.delete("/delete", (req, res) => {
  const { domain } = req.body;

  const query = "DELETE FROM dns_entries WHERE domain = ?";
  db.query(query, [domain], (err, result) => {
    if (err) {
      console.error("Error deleting DNS record:", err);
      res.status(500).send("Error deleting DNS record");
    } else if (result.affectedRows > 0) {
      res.send("DNS record deleted successfully");
    } else {
      res.send("No record found to delete");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
