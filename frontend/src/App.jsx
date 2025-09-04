import { Routes, Route } from "react-router-dom";
import Voluntarios from "./components/Voluntarios";
import Donaciones from "./components/Donaciones";
import Transportes from "./components/Transportes";
import Dashboard from "./components/Dashboard";
// import MapaTransportes from "./components/MapaTransportes";
import Calendari from "./components/calendario/Calendari"; 
import MapaVoluntarios from "./components/MapaVoluntarios";
import Card from "./components/Card/Card";
import Alegria from "./components/imagenes/alegria.png";
import Tristeza from "./components/imagenes/tristeza.png";
import Enfado from "./components/imagenes/enfado.png";
import Miedo from "./components/imagenes/miedo.png";
import Asco from "./components/imagenes/asco.png";
import Timidez from "./components/imagenes/timidez.png";

const emociones = [
  {
    title: "Alegría",
    alt: "Alegría : La emoción de sentir alegría y bienestar.",
    image: Alegria,
    link: "#alegria",
  },
  {
    title: "Tristeza",
    alt: "Tristeza : La emoción de sentirse apagado o melancólico.",
    image: Tristeza,
    link: "#tristeza",
  },
  {
    title: "Enfado",
    alt: "Enfado : una respuesta intensa ante algo frustrante o injusto.",
    image: Enfado,
    link: "#enfado",
  },
  {
    title: "Miedo",
    alt: "Miedo : La emoción de sentir amenaza o peligro.",
    image: Miedo,
    link: "#miedo",
  },
  {
    title: "Asco",
    alt: "Asco : La reacción de rechazo ante algo desagradable.",
    image: Asco,
    link: "#asco",
  },
  {
    title: "Timidez",
    alt: "Timidez : La emoción de sentirse inseguro o avergonzado.",
    image: Timidez,
    link: "#timidez",
  },
];



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
        <Route path="/card" element={
          <div className="container mt-5 d-flex flex-wrap gap-3">
            {emociones.map((emo, index) => (
              <Card
                key={index}
                title={emo.title}
                text={emo.text}
                image={emo.image}
                link={emo.link}
              />
            ))}
          </div>
        } />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/transportes" element={<Transportes />} />
        <Route path="/mapa" element={<MapaVoluntarios />} />
      </Routes>
    </div>
  );
}
