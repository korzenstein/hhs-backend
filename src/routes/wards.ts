import express, { Request, Response } from "express";
import { pool } from "../db";

const router = express.Router();

// GET /wards
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "Ward" ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching wards:", err);
    res.status(500).json({ error: "Failed to fetch wards" });
  }
});

export default router;
