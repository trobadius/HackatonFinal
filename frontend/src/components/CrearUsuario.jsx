import { useState } from "react";

export default function CrearUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = { email, password };
    console.log("Enviando usuario:", nuevoUsuario);

    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (res.ok) {
        alert("Usuario creado con éxito");
        setEmail("");
        setPassword("");
      } else {
        alert("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Formulario de Registro</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border p-6 rounded-lg shadow bg-white"
      >
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded p-2 w-64"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded p-2 w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}