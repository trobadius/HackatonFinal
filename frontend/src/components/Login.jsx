import { useState, useEffect } from "react";
import { login, getBeneficiaries, getStats } from "../api";


export default function Login() {
  const [token, setToken] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [stats, setStats] = useState([]);

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await login(email, password);
    if (res.token) setToken(res.token);
  }

  // 👇 cargar datos automáticos cuando ya tengo token
  useEffect(() => {
    if (token) {
      refreshData();
    }
  }, [token]);

  async function refreshData() {
    setBeneficiaries(await getBeneficiaries(token));
    setStats(await getStats(token));
  }

  // 👇 se llama desde el formulario al añadir beneficiario
  function handleAdded() {
    refreshData();
  }

  if (!token)
    return (
  <>
      <div className="container mt-5">
        <h2>Login Fundació Nexa</h2>
        <form onSubmit={handleLogin} className="card p-3">
          <input className="form-control mb-2" name="email" placeholder="Email" />
          <input className="form-control mb-2" name="password" type="password" placeholder="Contraseña" />
          <button className="btn btn-primary">Entrar</button>
        </form>
      </div>
      </>
    );
}