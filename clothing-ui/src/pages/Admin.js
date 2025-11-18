// src/pages/Admin.js
import { useEffect, useState } from "react";
import { getUser, isAdmin } from "../auth";
import { Navigate } from "react-router-dom";

const PRODUCT_API = "http://localhost:8081/products";

export default function Admin() {
<<<<<<< HEAD
	const u = getUser();
	if (!u) return <Navigate to="/login" replace />;
	if (!isAdmin()) return <div style={{ padding: 20 }}>Admins only.</div>;

	const [list, setList] = useState([]);
	const [p, setP] = useState({ name: "", price: "", stock: "" });

	const load = () => fetch(PRODUCT_API).then(r => r.json()).then(setList);
	useEffect(() => { load(); }, []);

	const add = async (e) => {
		e.preventDefault();
		await fetch(PRODUCT_API, {
			method: "POST", headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: p.name, price: Number(p.price), stock: Number(p.stock) })
		});
		setP({ name: "", price: "", stock: "" });
		load();
	};

	const edit = async (it) => {
		const name = prompt("Name:", it.name); if (name == null) return;
		const price = Number(prompt("Price:", it.price)); if (Number.isNaN(price)) return;
		const stock = Number(prompt("Stock:", it.stock)); if (Number.isNaN(stock)) return;
		await fetch(`${PRODUCT_API}/${it.id}`, {
			method: "PUT", headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, price, stock })
		});
		load();
	};

	const del = async (id) => {
		await fetch(`${PRODUCT_API}/${id}`, { method: "DELETE" });
		load();
	};

	return (
		<div style={{ padding: 20 }}>
			<h2>Admin — Manage Products</h2>
			<ul>
				{list.map(it => (
					<li key={it.id} style={{ marginBottom: 8 }}>
						{it.name} — ${it.price} (Stock: {it.stock})
						<button onClick={() => edit(it)} style={{ marginLeft: 8 }}>Edit</button>
						<button onClick={() => del(it.id)} style={{ marginLeft: 8 }}>Delete</button>
					</li>
				))}
			</ul>

			<h3>Add new product</h3>
			<form onSubmit={add}>
				<input placeholder="Name" value={p.name} onChange={e => setP({ ...p, name: e.target.value })} required />
				<input placeholder="Price" type="number" step="0.01" value={p.price} onChange={e => setP({ ...p, price: e.target.value })} required />
				<input placeholder="Stock" type="number" value={p.stock} onChange={e => setP({ ...p, stock: e.target.value })} required />
				<button type="submit">Add</button>
			</form>
		</div>
	);
=======
  const u = getUser();
  if (!u) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <div style={{ padding: 20 }}>Admins only.</div>;

  const [list, setList] = useState([]);
  const [p, setP] = useState({ name: "", price: "", stock: "" });

  const load = () => fetch(PRODUCT_API).then(r=>r.json()).then(setList);
  useEffect(()=>{ load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await fetch(PRODUCT_API, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: p.name, price: Number(p.price), stock: Number(p.stock) })
    });
    setP({ name: "", price: "", stock: "" });
    load();
  };

  const edit = async (it) => {
    const name = prompt("Name:", it.name); if (name == null) return;
    const price = Number(prompt("Price:", it.price)); if (Number.isNaN(price)) return;
    const stock = Number(prompt("Stock:", it.stock)); if (Number.isNaN(stock)) return;
    await fetch(`${PRODUCT_API}/${it.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, stock })
    });
    load();
  };

  const del = async (id) => {
    await fetch(`${PRODUCT_API}/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin — Manage Products</h2>
      <ul>
        {list.map(it => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            {it.name} — ${it.price} (Stock: {it.stock})
            <button onClick={()=>edit(it)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={()=>del(it.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add new product</h3>
      <form onSubmit={add}>
        <input placeholder="Name" value={p.name} onChange={e=>setP({...p, name:e.target.value})} required />
        <input placeholder="Price" type="number" step="0.01" value={p.price} onChange={e=>setP({...p, price:e.target.value})} required />
        <input placeholder="Stock" type="number" value={p.stock} onChange={e=>setP({...p, stock:e.target.value})} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
}
