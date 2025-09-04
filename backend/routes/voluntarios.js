import express from "express";
import axios from "axios";
import { db } from "../db.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM voluntarios ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREAR
router.post("/", async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    if (!nombre) return res.status(400).json({ error: "'nombre' es obligatorio" });

    let lat = null, lng = null;
    if (direccion) {
      try {
        const geo = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: direccion,
            format: "json",
            addressdetails: 1,
            limit: 1
          },
          headers: { 'User-Agent': 'voluntarios-app' }
        });
        if (geo.data && geo.data.length > 0) {
          lat = geo.data[0].lat;
          lng = geo.data[0].lon;
        }
      } catch (e) {
        // Si falla, no posem coordenades
      }
    }

    const result = await db.run(
      "INSERT INTO voluntarios (nombre, email, telefono, direccion, lat, lng) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, email ?? null, telefono ?? null, direccion ?? null, lat, lng]
    );

    const created = await db.get("SELECT * FROM voluntarios WHERE id = ?", result.lastID);
    res.json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ACTUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, direccion } = req.body;
    if (!nombre) return res.status(400).json({ error: "'nombre' es obligatorio" });

    let lat = null, lng = null;
    if (direccion) {
      try {
        const geo = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: direccion,
            format: "json",
            addressdetails: 1,
            limit: 1
          },
          headers: { 'User-Agent': 'voluntarios-app' }
        });
        if (geo.data && geo.data.length > 0) {
          lat = geo.data[0].lat;
          lng = geo.data[0].lon;
        }
      } catch (e) {
        // Si falla, no posem coordenades
      }
    }

    await db.run(
      "UPDATE voluntarios SET nombre = ?, email = ?, telefono = ?, direccion = ?, lat = ?, lng = ? WHERE id = ?",
      [nombre, email ?? null, telefono ?? null, direccion ?? null, lat, lng, id]
    );

    await db.run(
      "UPDATE voluntarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?",
      [nombre, email ?? null, telefono ?? null, id]
    );

    const updated = await db.get("SELECT * FROM voluntarios WHERE id = ?", id);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ELIMINAR
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.run("DELETE FROM voluntarios WHERE id = ?", id);
    res.json({ message: "Voluntario eliminado" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
