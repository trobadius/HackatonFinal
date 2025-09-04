const API = "http://localhost:3001";
export async function addBeneficiary(token, data) {
  const res = await fetch(API + "/beneficiaries", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function login(email, password) {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function getBeneficiaries(token) {
  const res = await fetch(API + "/beneficiaries", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function getStats(token) {
  const res = await fetch(API + "/stats", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
