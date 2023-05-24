const express = require("express");
const router = express.Router();
const db = require("../db");

// Route handlers
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

// getting all contacts function
function getAllContacts(req, res) {
  const query = "SELECT * FROM contacts";
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "internal server error" });
    }

    res.status(200).json({
      data: {
        contacts: results,
      },
    });
  });
}

// getting single contact by ID function
function getContactById(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM contacts WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.status(200).json({
      data: {
        contact: result,
      },
    });
  });
}

// creating contact into database function
function createContact(req, res) {
  const { name, email, phone } = req.body;

  const validationError = validateContact(name, email, phone);

  if (validationError) {
    return res.status(400).json(validationError);
  }

  const query = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
  db.query(query, [name, email, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "internal server error" });
    }

    res.status(201).json({
      data: {
        id: result.insertId,
        name: name,
        email: email,
        phone: phone,
      },
    });
  });
}

// updating contact function
function updateContact(req, res) {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const validationError = validateContact(name, email, phone);

  if (validationError) {
    return res.status(400).json(validationError);
  }

  const query =
    "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?";
  db.query(query, [name, email, phone, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.json({
      data: {
        id: id,
        name: name,
        email: email,
        phone: phone,
      },
    });
  });
}

// deleting contact function
function deleteContact(req, res) {
  const { id } = req.params;

  const query = "DELETE FROM contacts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    return res.sendStatus(204);
  });
}

// ------------------------------- validation functions ----------------------------

// general contact validation function, checks taht all required fields are filled and validates each field
function validateContact(name, email, phone) {
  if (!name || !email || !phone) {
    return { error: "Missing required fields" };
  }

  if (!validateEmail(email)) {
    return { error: "Emails not valid" };
  }

  if (!validatePhoneNumber(phone)) {
    return { error: "Phone number not valid" };
  }

  if (name.length < 2) {
    return { error: "Name not valid" };
  }

  return null;
}

// email validation function
function validateEmail(email) {
  const regex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// phone number validation function
function validatePhoneNumber(phoneNumber) {
  const regex = /^\d+$/;
  return regex.test(phoneNumber);
}

module.exports = router;
