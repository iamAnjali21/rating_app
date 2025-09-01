import express from "express";
import connectDB from "../config/db.js";

const router = express.Router();


router.post("/ratings", async (req, res) => {
  try {
    const { userId, storeId, rating } = req.body;
    if (!userId || !storeId || !rating) return res.status(400).json({ error: "Missing data" });

    const connection = await connectDB();

    // Insert or update rating
    await connection.query(
      `INSERT INTO ratings (userId, storeId, rating)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
      [userId, storeId, rating]
    );

    // Update store avgRating
    const [rows] = await connection.query(
      "SELECT AVG(rating) AS avgRating FROM ratings WHERE storeId = ?",
      [storeId]
    );

    const avgRating = parseFloat(rows[0].avgRating).toFixed(1);

    await connection.query(
      "UPDATE stores SET avgRating = ? WHERE id = ?",
      [avgRating, storeId]
    );

    res.json({ avgRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* GET */
router.get("/stores/:id/ratings", async (req, res) => {
  try {
    const storeId = req.params.id;
    const connection = await connectDB();

    const [ratings] = await connection.query(
      `SELECT r.id, r.rating, r.userId, u.name as userName, u.email as userEmail
       FROM ratings r
       JOIN users u ON r.userId = u.id
       WHERE r.storeId = ?`,
      [storeId]
    );

    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
