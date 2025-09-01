import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET /owner/stores/:ownerId
router.get("/stores/:ownerId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

   
    const [stores] = await pool.query(
      "SELECT id, name, email, address, avgRating FROM stores WHERE owner_id = ?",
      [ownerId]
    );

    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
