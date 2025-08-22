import express from "express";
import connectDB from "../config/db.js";

const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
  try {
     const connection = await connectDB();
    const [rows] = await connection.query("SELECT id, name, email, address, role FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

       const connection = await connectDB();
    const [result] = await connection.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?,?,?,?,?)",
      [name, email, password, address, role]
    );
    res.json({ id: result.insertId, name, email, address, role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all stores
router.get("/stores", async (req, res) => {
  try {
     const connection = await connectDB();
    const [rows] = await connection.query("SELECT id, name, email, address, avgRating FROM stores");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new store
router.post("/stores", async (req, res) => {
  try {
    const { name, email, address } = req.body;
     const connection = await connectDB();
    const [result] = await connection.query(
      "INSERT INTO stores (name, email, address, avgRating) VALUES (?,?,?,0)",
      [name, email, address]
    );
    res.json({ id: result.insertId, name, email, address, avgRating: 0 });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
