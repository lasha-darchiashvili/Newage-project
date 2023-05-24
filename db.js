const mysql = require("mysql2");
require("dotenv").config();
const contactsData = require("./contactsData");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

let createQuery = "CREATE DATABASE IF NOT EXISTS contact_management";

// creating database
db.query(createQuery, (err, result) => {
  if (err) throw err;
  console.log("Database Created or exists");
});

// using database
let useQuery = `USE contact_management`;
db.query(useQuery, (error) => {
  if (error) throw error;
});

const sql = `CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL
  )`;

// creating tables
db.query(sql, (err, result) => {
  if (err) throw err;

  //check if data already exists
  const checkQuery = "SELECT COUNT(*) AS count FROM contacts";
  db.query(checkQuery, (err, result) => {
    if (err) throw err;

    if (result[0].count === 0) {
      //seed data
      const insertQuery =
        "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
      contactsData.forEach((contact) => {
        db.query(
          insertQuery,
          [contact.name, contact.email, contact.phone],
          (err, result) => {
            if (err) throw err;
            console.log(`Inserted contact with ID: ${result.insertId}`);
          }
        );
      });
    }
  });
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

module.exports = db;
