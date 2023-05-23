const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lasha",
  database: "contact_management",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.use(express.json());

app.get("/createDatabase", (req, res) => {
  let createQuery = "CREATE DATABASE IF NOT EXISTS contact_management";

  db.query(createQuery, (err, result) => {
    if (err) throw err;
    console.log("Database Created or exists");

    return res.send(`Created and Using`);
  });
});

const sql = `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
)`;

db.query(sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});

app.get("/contacts", (req, res) => {
  const query = "SELECT * FROM contacts";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error");
      return res.status(500).json({ error: err.sqlMessage });
    }

    res.status(200).json({
      status: "success",
      data: {
        contacts: results,
      },
    });
  });
});

app.get("/contacts/:id", (req, res) => {
  const query = `SELECT * FROM contacts WHERE id = ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error fetching data");
      return res.status(500).json({ error: err.sqlMessage });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        contact: result,
      },
    });
  });
});

app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;

  const query = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
  db.query(query, [name, email, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.sqlMessage });
    }

    res.status(201).json({
      status: "success",
      data: {
        id: result.insertId,
        name: name,
        email: email,
        phone: phone,
      },
    });
  });
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const query =
    "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?";
  db.query(query, [name, email, phone, id], (err, result) => {
    if (err) {
      console.error("Error");
      return res.status(500).json({ error: err.sqlMessage });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.json({
      status: "success",
      data: {
        id: id,
        name: name,
        email: email,
        phone: phone,
      },
    });
  });
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM contacts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error");
      return res.status(500).json({ error: err.sqlMessage });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.json({
      status: "success",
    });
  });
});

app.listen("3000", () => {
  console.log("server started");
});
