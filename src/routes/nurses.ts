import express, { Request, Response } from "express";
import { pool } from "../db";

const router = express.Router();

// GET /nurses
router.get("/", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string) || "";

  const offset = (page - 1) * limit;

  try {
    const baseQuery = `
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
      WHERE nurse.first_name ILIKE $1 OR nurse.last_name ILIKE $1 OR ward.name ILIKE $1
      ORDER BY nurse.last_name ASC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM nurse
      LEFT JOIN ward ON nurse.ward_id = ward.id
      WHERE nurse.first_name ILIKE $1 OR nurse.last_name ILIKE $1 OR ward.name ILIKE $1
    `;

    const [dataResult, countResult] = await Promise.all([
      pool.query(baseQuery, [`%${search}%`, limit, offset]),
      pool.query(countQuery, [`%${search}%`])
    ]);

    res.json({
      nurses: dataResult.rows,
      total: parseInt(countResult.rows[0].total),
      page,
      limit
    });
  } catch (err) {
    console.error("Error fetching nurses with pagination:", err);
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


// PATCH /nurses/:id
router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, email, ward_id } = req.body;

  if (!first_name || !last_name || !email || !ward_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `
      UPDATE nurse
      SET first_name = $1,
          last_name = $2,
          email = $3,
          ward_id = $4
      WHERE id = $5
      RETURNING *
      `,
      [first_name, last_name, email, ward_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Nurse not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    console.error("Failed to update nurse:", err.message);
    res.status(500).json({ error: "Failed to update nurse" });
  }
});



export default router;
