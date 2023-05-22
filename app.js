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

      return res.send(`Created and Using`);
    });
  });
});

app.listen("3000", () => {
  console.log("server started");
});
