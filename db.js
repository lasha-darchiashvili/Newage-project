const mysql = require("mysql2");
require("dotenv").config();

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

// creating table
db.query(sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

module.exports = db;
