import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

// Icono personalizado para transportes

const API = "http://localhost:5000/api/transportes";

export default function MapaVoluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {
      setVoluntarios(res.data);
    });
  }, []);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h2 className="h4 mb-3">🚐 Ubicació de transportes</h2>

        <MapContainer
          center={[41.3888, 2.159]} // Barcelona
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          {voluntarios
            .filter((t) => t.lat && t.lng)
            .map((t) => (
              <Marker key={t.id} position={[t.lat, t.lng]}>
                <Popup>
                  🚐 <b>{t.vehiculo}</b> <br />
                  👨 {t.conductor || "—"} <br />
                  ⚡ {t.disponibilidad}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
