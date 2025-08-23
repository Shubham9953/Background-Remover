const API_URL = "http://localhost:5000/api";

export async function signup(name, email, password) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include"
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });
  return res.json();
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function removeBackground(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://localhost:5000/remove-bg", {
    method: "POST",
    body: formData
  });

  if (!res.ok) throw new Error("Failed to remove background");

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
