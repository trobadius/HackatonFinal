import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/transportes";

export default function Transportes() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    vehiculo: "",
    conductor: "",
    disponibilidad: "",
  });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await axios.get(API);
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.vehiculo.trim()) return alert("El vehículo es obligatorio");

    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ vehiculo: "", conductor: "", disponibilidad: "Disponible" });
    load();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      vehiculo: item.vehiculo ?? "",
      conductor: item.conductor ?? "",
      disponibilidad: item.disponibilidad ?? "Disponible",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar voluntario?")) return;
    await axios.delete(`${API}/${id}`);
    load();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ vehiculo: "", conductor: "", disponibilidad: "Disponible" });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Transportes</h2>

        <form onSubmit={handleSubmit} className="row g-2 mb-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Vehículo"
              value={form.vehiculo}
              onChange={(e) => setForm({ ...form, vehiculo: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Conductor"
              value={form.conductor}
              onChange={(e) => setForm({ ...form, conductor: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label"></label>
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
            <label className="form-label"></label>
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
              value={form.disponibilidad}
              onChange={(e) =>
                setForm({ ...form, disponibilidad: e.target.value })
              }
            >
              <option>Acompañamiento médico</option>
              <option>Acompañamiento lúdico</option>
              <option>Terapia</option>
              <option>Donación económica</option>
              <option>Otros</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="number"
              step="0.0001"
              placeholder="Latitud"
              value={form.lat || ""}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="number"
              step="0.0001"
              placeholder="Longitud"
              value={form.lng || ""}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
            />
          </div>
          <div className="col-md-1 d-flex gap-2">
            <button className="btn btn-primary flex-fill" type="submit">
              {editingId ? "Guardar" : "Agregar"}
            </button>
            {editingId && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Servicio</th>
                <th>Disponibilidad</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.vehiculo}</td>
                  <td>{t.conductor || "—"}</td>
                  <td>{t.disponibilidad}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleEdit(t)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
