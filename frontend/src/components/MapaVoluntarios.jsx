import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/voluntariado";


export default function MapaVoluntarios() {
  const [voluntariado, setVoluntariado] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {
      setVoluntariado(res.data);
    });
  }, []);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
  <h2 className="h4 mb-3">🚐 Ubicación de voluntariado</h2>

        <MapContainer
          center={[41.3888, 2.159]} // Barcelona
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          {voluntariado
            .filter((v) => v.lat && v.lng)
            .map((v) => (
              <Marker key={v.id} position={[v.lat, v.lng]}>
                <Popup>
                  🚐 <b>{v.nombre}</b> <br />
                  👨 {v.servicio } <br />
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
