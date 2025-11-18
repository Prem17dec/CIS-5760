// src/pages/Login.js
import { useState } from "react";
<<<<<<< HEAD
import { login, getUser } from "../auth";
import { useNavigate } from "react-router-dom";


export default function Login() {
	const nav = useNavigate();
	const [email, setEmail] = useState(getUser()?.email || "");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		setErr("");

		try {
			await login(email, password);
			nav("/shop");
		} catch (e) {
			setErr("Invalid email or password");
		}
	};

	// Quick demo creds
	// Customer: customer@wcs.com / test123
	// Admin:    admin@wcs.com    / admin123

	return (
		<div style={{ display: "grid", placeItems: "center", paddingTop: 60 }}>
			<div style={{
				width: 360, background: "white", borderRadius: 16,
				boxShadow: "0 10px 30px rgba(0,0,0,0.1)", padding: 24
			}}>
				<h2 style={{ marginTop: 0 }}>Login</h2>
				{err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}
				<form onSubmit={onSubmit}>
					<div style={{ marginBottom: 12 }}>
						<label>Email</label>
						<input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
							required style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }} />
					</div>
					<div style={{ marginBottom: 12 }}>
						<label>Password</label>
						<input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
							required style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }} />
					</div>
					<button type="submit" style={{
						width: "100%", background: "#111827", color: "white",
						border: "none", padding: 10, borderRadius: 8, cursor: "pointer"
					}}>Sign in</button>
				</form>
				<div style={{ fontSize: 12, color: "#555", marginTop: 12 }}>
					Tip: try <b>customer@wcs.com / test123</b> or <b>admin@wcs.com / admin123</b>
				</div>
			</div>
		</div>
	);
=======
import { saveUser, getUser } from "../auth";
import { useNavigate } from "react-router-dom";

const CUSTOMER_API = "http://localhost:8082/auth/login";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState(getUser()?.email || "");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const resp = await fetch(CUSTOMER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!resp.ok) throw new Error(await resp.text());
      const data = await resp.json();
      saveUser(data);                // {customerId, name, email, role}
      nav("/shop");
    } catch (e) {
      setErr("Invalid email or password");
    }
  };

  // Quick demo creds
  // Customer: customer@wcs.com / test123
  // Admin:    admin@wcs.com    / admin123

  return (
    <div style={{ display: "grid", placeItems: "center", paddingTop: 60 }}>
      <div style={{
        width: 360, background: "white", borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)", padding: 24
      }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>
        {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email"
              required style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }}/>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"
              required style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }}/>
          </div>
          <button type="submit" style={{
            width: "100%", background: "#111827", color: "white",
            border: "none", padding: 10, borderRadius: 8, cursor: "pointer"
          }}>Sign in</button>
        </form>
        <div style={{ fontSize: 12, color: "#555", marginTop: 12 }}>
          Tip: try <b>customer@wcs.com / test123</b> or <b>admin@wcs.com / admin123</b>
        </div>
      </div>
    </div>
  );
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
}

