import fs from "fs";
import sqlite3 from "sqlite3";

const dbFile = "nexa.sqlite";       // archivo SQLite
const seedFile = "seed.sql";        // archivo con sentencias SQL

// Abrir BD
sqlite3.verbose();
const db = new sqlite3.Database(dbFile);

// Leer contenido del seed.sql
const sql = fs.readFileSync(seedFile, "utf-8");

// Ejecutar SQL
db.exec(sql, (err) => {
  if (err) {
    console.error("❌ Error ejecutando seed.sql:", err.message);
  } else {
    console.log("✅ Datos insertados correctamente desde seed.sql");
  }
  db.close();
});