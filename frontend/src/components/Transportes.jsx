import { useState } from "react";
import Calendari from "./calendario/Calendari.jsx";

export default function Transportes() {
  const [form, setForm] = useState({
    nombre: "",
    servicio: "Otros",
    fechaInicio: "",
    fechaFin: "",
    lat: "",
    lng: ""
  });


  const [transportes, setTransportes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return alert("El vehículo es obligatorio");
    if (!form.fechaInicio || !form.fechaFin) return alert("Les dates són obligatòries");


    setTransportes(prev => [
      ...prev,
      {
        ...form,
        id: Date.now().toString()
      }
    ]);

    setForm({
      nombre: "",
      servicio: "Otros",
      fechaInicio: "",
      fechaFin: "",
      lat: "",
      lng: ""
    });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Voluntariado</h2>

        <form onSubmit={handleSubmit} className="row g-2 mb-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={form.fechaInicio}
              onChange={(e) =>
                setForm({ ...form, fechaInicio: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={form.fechaFin}
              onChange={(e) => setForm({ ...form, fechaFin: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={form.servicio}
              onChange={(e) =>
                setForm({ ...form, servicio: e.target.value })
              }
            >
              <option value="">Selecciona un servicio</option>
              <option>Acompañamiento médico</option>
              <option>Acompañamiento lúdico</option>
              <option>Terapia</option>
              <option>Donación económica</option>
              <option>Otros</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              className="form-select"
              type="number"
              step="0.0001"
              placeholder="Latitud"
              value={form.lat || ""}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-select"
              type="number"
              step="0.0001"
              placeholder="Longitud"
              value={form.lng || ""}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
            />
          </div>
          <div className="col-md-1 d-flex gap-2">
            <button className="btn btn-primary flex-fill" type="submit">
              Agregar
            </button>
          </div>
        </form>

        {/* Passa l'array de transports a Calendari */}
        <Calendari transportes={transportes} />
      </div>
    </div>
  );
}