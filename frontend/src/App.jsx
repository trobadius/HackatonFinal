import { Routes, Route } from "react-router-dom";
import Voluntarios from "./components/Voluntarios";
import Donaciones from "./components/Donaciones";
import Transportes from "./components/Transportes";
import Dashboard from "./components/Dashboard";
// import MapaTransportes from "./components/MapaTransportes";
import Calendari from "./components/calendario/Calendari"; 
import MapaVoluntarios from "./components/MapaVoluntarios";
export default function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Fundación Nexa – Gestión</h1>
      <Routes>
        <Route path="/" element={
          <>
            <Dashboard />
            <MapaVoluntarios />
            <div className="row g-4 mt-4">
              <div className="col-12"><Voluntarios /></div>
              <div className="col-12"><Donaciones /></div>
              <div className="col-12"><Transportes /></div>
            </div>
          </>
        } />
        <Route path="/calendar" element={<Calendari />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/transportes" element={<Transportes />} />
        <Route path="/mapa" element={<MapaVoluntarios />} />
      </Routes>
    </div>
  );
}
