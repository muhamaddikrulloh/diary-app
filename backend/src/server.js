import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();

app.use(cors());
app.use(express.json());

// Koneksi MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
});

// Test server
app.get("/", (req, res) => {
  res.json({ message: "Diary API aktif" });
});

// READ semua diary
app.get("/api/diaries", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM diaries ORDER BY id DESC");

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
    });
  }
});

// READ satu diary
app.get("/api/diaries/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM diaries WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Diary tidak ditemukan",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail",
    });
  }
});

// CREATE
app.post("/api/diaries", async (req, res) => {
  try {
    const { title, diary_date, body, mood } = req.body;

    if (!title || !diary_date || !body) {
      return res.status(400).json({
        message: "Data belum lengkap",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO diaries
       (title, diary_date, body, mood)
       VALUES (?, ?, ?, ?)`,
      [title, diary_date, body, mood || "😊"],
    );

    const [rows] = await db.execute("SELECT * FROM diaries WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambah diary",
    });
  }
});

// UPDATE
app.put("/api/diaries/:id", async (req, res) => {
  try {
    const { title, diary_date, body, mood } = req.body;

    await db.execute(
      `UPDATE diaries
       SET title = ?, diary_date = ?, body = ?, mood = ?
       WHERE id = ?`,
      [title, diary_date, body, mood, req.params.id],
    );

    const [rows] = await db.execute("SELECT * FROM diaries WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Diary tidak ditemukan",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengubah diary",
    });
  }
});

// DELETE
app.delete("/api/diaries/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM diaries WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Diary tidak ditemukan",
      });
    }

    res.json({
      message: "Diary berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus diary",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API berjalan di port ${PORT}`);
});
