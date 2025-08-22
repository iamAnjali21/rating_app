import express from "express";
import connectDB from "../config/db.js";

const router = express.Router();

/**
 * GET /stores
 * Fetch all stores (for admin dashboard)
 */
router.get("/stores", async (req, res) => {
  try {
    const connection = await connectDB();
    const [stores] = await connection.query(
      "SELECT id, name, email, address, COALESCE(avgRating,0) AS avgRating FROM stores"
    );
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /stores/:userId
 * Fetch all stores + this user's rating
 */
router.get("/stores/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const connection = await connectDB();

    const [stores] = await connection.query(
      "SELECT id, name, email, address, COALESCE(avgRating,0) AS avgRating FROM stores"
    );

    const [ratings] = await connection.query(
      "SELECT storeId, rating FROM ratings WHERE userId = ?",
      [userId]
    );

    const storesWithUserRating = stores.map(store => {
      const userRating = ratings.find(r => r.storeId === store.id);
      return { ...store, userRating: userRating ? userRating.rating : 0 };
    });

    res.json(storesWithUserRating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * POST /stores
 * Create a new store (Admin)
 */
router.post("/stores", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    if (!name || !email || !address) return res.status(400).json({ error: "Missing data" });

    const connection = await connectDB();
    const [result] = await connection.query(
      "INSERT INTO stores (name, email, address, avgRating) VALUES (?, ?, ?, 0)",
      [name, email, address]
    );

    res.status(201).json({ id: result.insertId, name, email, address, avgRating: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
