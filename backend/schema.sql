PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    dni TEXT NOT NULL UNIQUE,
    telefono TEXT NOT NULL,
    direccion TEXT NOT NULL,
    disponibilidad TEXT NOT NULL CHECK(disponibilidad IN ('S', 'N')),
    rol TEXT NOT NULL CHECK(rol IN ('voluntario', 'familia')),
    fecha_disponibilidad DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS voluntarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefono TEXT NOT NULL,
    acciones TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transportes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehiculo TEXT NOT NULL,
    conductor TEXT NOT NULL,
    disponibilidad TEXT NOT NULL CHECK(disponibilidad IN ('S', 'N')),
    acciones TEXT NOT NULL
);