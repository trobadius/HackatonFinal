import express from "express";
import cors from "cors";
import "./db.js"; // asegura la inicialización de la DB
import voluntarioRoutes from "./routes/voluntarios.js";
import donacionRoutes from "./routes/donaciones.js";
import transporteRoutes from "./routes/transportes.js";

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:5177"], credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true, service: "nexa-backend" }));

app.use("/api/voluntarios", voluntarioRoutes);
app.use("/api/donaciones", donacionRoutes);
app.use("/api/transportes", transporteRoutes);
// Ruta per al mapa de voluntaris
import { db } from "./db.js";
app.get("/api/mapa", async (req, res) => {
	try {
		// Retorna només voluntaris amb lat/lng
		const rows = await db.all("SELECT id, nombre, email, telefono, lat, lng FROM voluntarios WHERE lat IS NOT NULL AND lng IS NOT NULL");
		res.json(rows);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

// 404
app.use((req, res) => {
res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor backend http://localhost:${PORT}`));
