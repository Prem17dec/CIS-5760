// src/auth.js
const KEY = "currentUser";
<<<<<<< HEAD
const CUSTOMER_AUTH_API = "http://localhost:8082/auth";


export function saveUser(u) {
	localStorage.setItem(KEY, JSON.stringify(u));
}

export function getUser() {
	try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}

export function logout() {
	localStorage.removeItem(KEY);
}

export function isAdmin() {
	const u = getUser();
	return u && u.role === "ADMIN";
}

export function isCustomer() {
	const u = getUser();
	// User must be logged in AND their role must be explicitly "CUSTOMER"
	return u && u.role === "CUSTOMER";
}

export function requireUser() {
	const u = getUser();
	if (!u) throw new Error("Not logged in");
	return u;
}


export async function login(email, password) {
	const resp = await fetch(`${CUSTOMER_AUTH_API}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password })
	});

	if (!resp.ok) {
		// "Invalid credentials"
		throw new Error("Invalid credentials");
	}

	const data = await resp.json();
	saveUser(data);
	return data;
}

export async function register(name, email, password) {
	const resp = await fetch(`${CUSTOMER_AUTH_API}/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password })
	});

	if (!resp.ok) {
		// Email already registered
		const errorText = await resp.text();
		throw new Error(errorText || "Registration failed.");
	}

	const data = await resp.json();
	return data;
}
=======

export function saveUser(u) {
  localStorage.setItem(KEY, JSON.stringify(u));
}
export function getUser() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}
export function logout() {
  localStorage.removeItem(KEY);
}
export function isAdmin() {
  const u = getUser();
  return u && u.role === "ADMIN";
}
export function requireUser() {
  const u = getUser();
  if (!u) throw new Error("Not logged in");
  return u;
}
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
