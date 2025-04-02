import express, { Request, Response } from "express";
import { pool } from "../db";

const router = express.Router();

// GET /nurses
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        nurse.id,
        nurse.first_name,
        nurse.last_name,
        nurse.email,
        nurse.employee_id,
        nurse.ward_id,
        ward.name AS ward_name,
        ward.color AS ward_color
      FROM nurse
      LEFT JOIN ward ON nurse.ward_id = ward.id
      ORDER BY nurse.last_name ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching nurses:", err);
    res.status(500).json({ error: "Failed to fetch nurses" });
  }
});


// POST /nurses
router.post("/", async (req: Request, res: Response) => {
  const { first_name, last_name, email, ward_id } = req.body;

  if (!first_name || !last_name || !email || !ward_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO nurse (first_name, last_name, email, ward_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [first_name, last_name, email, ward_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Failed to create nurse:", err.message);
    res.status(500).json({ error: "Failed to create nurse" });
  }
});

// DELETE /nurses/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM nurse WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Nurse not found" });
    }

    res.status(200).json({ message: "Nurse deleted", nurse: result.rows[0] });
  } catch (err) {
    console.error("Error deleting nurse:", err);
    res.status(500).json({ error: "Failed to delete nurse" });
  }
});


export default router;
