const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lasha",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.get("/createDatabase", (req, res) => {
  let createQuery = "CREATE DATABASE IF NOT EXISTS contact_management";

  db.query(createQuery, (err, result) => {
    if (err) throw err;

    console.log("Database Created or exists");

    let useQuery = `USE contact_management`;
    db.query(useQuery, (error) => {
      if (error) throw error;

      console.log("Using Database");

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

      return res.send(`Created and Using`);
    });
  });
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

    res.status(200).json({
      status: "success",
      data: {
        contact: result,
      },
    });
  });
});

app.listen("3000", () => {
  console.log("server started");
});
