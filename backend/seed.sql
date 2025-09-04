-- usuario admin (contraseña: Admin123!)
INSERT OR IGNORE INTO users(nombre,email, password, dni, telefono, direccion, disponibilidad, rol, fecha_disponibilidad)
VALUES (
 'ADMIN',
 'admin@nexa.org',
 '$2a$10$7Y9uMyM9Y/EJnpvTrk6gxOt9yDsXLyA0b4PR0HJ0dPPbQw8qGrw2G',
 '27943458E',
 '658965741',
 'Carrer de la Marina, 16, 08005 Barcelona',
 'S',
 'voluntario',
 '2023-01-01'
);
