const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

// ---------- DB POOL ----------
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Babai@1422",  // apna password
  database: "clientdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- CLIENT ROUTES ----------

// Get all clients
app.get("/api/clients", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clients ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /clients error:", err);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// Get one client
app.get("/api/clients/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clients WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ error: "Client not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET /clients/:id error:", err);
    res.status(500).json({ error: "Failed to fetch client" });
  }
});

// Create client
app.post("/api/clients", async (req, res) => {
  try {
    console.log("RECEIVED CLIENT PAYLOAD:", req.body);

    const {
      firstName,
      middleName,
      lastName,
      email,
      gender,
      dob,
      address,
      password,
    } = req.body;

    const query = `
      INSERT INTO clients
      (firstName, middleName, lastName, email, gender, dob, address, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
      firstName,
      middleName || null,
      lastName,
      email,
      gender,
      dob, // already yyyy-mm-dd aa raha hai Angular se
      address,
      password,
    ]);

    res.status(201).json({ id: result.insertId, message: "Client added" });
  } catch (err) {
    console.error("POST /clients error:", err);
    res.status(500).json({ error: "Failed to create client" });
  }
});

// Update client
// Update client
app.put("/api/clients/:id", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      gender,
      dob,
      address,
    } = req.body;

    const query = `
      UPDATE clients
      SET firstName=?, middleName=?, lastName=?, email=?, gender=?,
          dob=?, address=?
      WHERE id=?
    `;

    const [result] = await pool.query(query, [
      firstName,
      middleName || null,
      lastName,
      email,
      gender,
      dob,
      address,
      req.params.id,
    ]);

    res.json({ affected: result.affectedRows, message: "Client updated" });
  } catch (err) {
    console.error("PUT /clients error:", err);
    res.status(500).json({ error: "Failed to update client" });
  }
});


// Delete client
app.delete("/api/clients/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM clients WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ affected: result.affectedRows, message: "Client deleted" });
  } catch (err) {
    console.error("DELETE /clients error:", err);
    res.status(500).json({ error: "Failed to delete client" });
  }
});

// ---------- MEETING ROUTES ----------

// All meetings
// Get all meetings with client details
app.get("/api/meetings", async (req, res) => {
  try {
    const query = `
      SELECT 
        m.id, m.topic, m.meetingDate, m.meetingTime, m.location, 
        c.firstName, c.lastName
      FROM meetings m
      JOIN clients c ON c.id = m.client_id
      ORDER BY m.id DESC
    `;

    const [rows] = await pool.query(query);
    res.json(rows);

  } catch (err) {
    console.error("GET /meetings error:", err);
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
});



// Create meeting
app.post("/api/meetings", async (req, res) => {
  try {
    let { client_id, topic, meetingDate, meetingTime, location, notes } = req.body;

    // --- Fix Date Format (dd-mm-yyyy → yyyy-mm-dd) ---
    if (meetingDate && meetingDate.includes("-")) {
      const parts = meetingDate.split("-");
      if (parts[0].length === 2) {
        meetingDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    // --- Fix Time Format (HH:MM → HH:MM:SS) ---
    if (meetingTime && meetingTime.length === 5) {
      meetingTime = meetingTime + ":00";
    }

    const query = `
      INSERT INTO meetings
      (client_id, topic, meetingDate, meetingTime, location, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
      client_id,
      topic,
      meetingDate,
      meetingTime,
      location || null,
      notes || null,
    ]);

    res.status(201).json({ id: result.insertId, message: "Meeting added" });

  } catch (err) {
    console.error("POST /meetings error:", err);
    res.status(500).json({ error: "Failed to create meeting" });
  }
});




// Delete meeting
app.delete("/api/meetings/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM meetings WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ affected: result.affectedRows, message: "Meeting deleted" });
  } catch (err) {
    console.error("DELETE /meetings error:", err);
    res.status(500).json({ error: "Failed to delete meeting" });
  }
});

// ---------- START ----------
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/client-app/dist/index.html'));
});



