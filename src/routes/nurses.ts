import express, { Request, Response } from "express";
import { pool } from "../db";

const router = express.Router();

// GET /nurses
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "Nurse" ORDER BY "lastName" ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching nurses:", err);
    res.status(500).json({ error: "Failed to fetch nurses" });
  }
});


export default router;
