// src/pages/AdminDashboard.js
<<<<<<< HEAD
//import { useEffect, useState } from "react";
//import { Navigate } from "react-router-dom";
=======
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
import { Auth } from "../auth";

const productAPI = "http://localhost:8081/products";
const customerAPI = "http://localhost:8082/customers";

<<<<<<< HEAD
//This is temporaray.
const ADMIN_AUTH_HEADERS = {
	"Authorization": "Basic " + btoa("admin@wcs.com:admin123"), // Base64 encoding for Basic Auth
	"Content-Type": "application/json"
};

export default function AdminDashboard() {
	if (!Auth.isAdmin()) return <div style={{ padding: 20 }}>Access Denied.</div>;

	const [products, setProducts] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [p, setP] = useState({ name: "", price: "", stock: "" });
	const [c, setC] = useState({ name: "", email: "" });

	useEffect(() => { loadProducts(); loadCustomers(); }, []);
	const loadProducts = () => fetch(productAPI).then(r => r.json()).then(setProducts);
	const loadCustomers = () => fetch(customerAPI, { headers: ADMIN_AUTH_HEADERS }).then(r => r.json()).then(setCustomers);

	const addProduct = (e) => {
		e.preventDefault();
		fetch(productAPI, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: p.name, price: Number(p.price), stock: Number(p.stock) })
		}).then(() => { setP({ name: "", price: "", stock: "" }); loadProducts(); });
	};

	const addCustomer = (e) => {
		e.preventDefault();
		fetch(customerAPI, {
			method: "POST",
			headers: ADMIN_AUTH_HEADERS,
			body: JSON.stringify({ name: c.name, email: c.email })
		}).then(() => { setC({ name: "", email: "" }); loadCustomers(); });
	};

	const deleteProduct = (id) =>
		fetch(`${productAPI}/${id}`, { method: "DELETE" }).then(loadProducts);

	const deleteCustomer = (id) =>
		fetch(`${customerAPI}/${id}`, {
			method: "DELETE",
			headers: ADMIN_AUTH_HEADERS
		}).then(loadCustomers);

	const editProduct = (item) => {
		const name = prompt("Product name:", item.name);
		if (name == null) return;
		const priceStr = prompt("Price:", item.price);
		if (priceStr == null) return;
		const stockStr = prompt("Stock:", item.stock);
		if (stockStr == null) return;
		const price = Number(priceStr);
		const stock = Number(stockStr);
		fetch(`${productAPI}/${item.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, price, stock })
		}).then(loadProducts);
	};

	const editCustomer = (item) => {
		const name = prompt("Customer name:", item.name);
		if (name == null) return;

		const email = prompt("Email:", item.email);
		if (email == null) return;

		fetch(`${customerAPI}/${item.id}`, {
			method: "PUT",
			headers: ADMIN_AUTH_HEADERS,
			body: JSON.stringify({ name, email })
		}).then(loadCustomers);
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>Admin Dashboard</h1>
			<p style={{ color: "#666", marginTop: -8 }}>Manage products and customers</p>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
				<div className="card">
					<h2>Products</h2>
					<ul>
						{products.map(item => (
							<li key={item.id} style={{ marginBottom: 8 }}>
								{item.name} — ${item.price} (Stock: {item.stock})
								<button style={{ marginLeft: 8 }} onClick={() => editProduct(item)}>Edit</button>
								<button style={{ marginLeft: 8 }} onClick={() => deleteProduct(item.id)}>Delete</button>
							</li>
						))}
					</ul>
					<form onSubmit={addProduct}>
						<div className="row"><input placeholder="Name" value={p.name} onChange={e => setP({ ...p, name: e.target.value })} required /></div>
						<div className="row"><input placeholder="Price" type="number" step="0.01" value={p.price} onChange={e => setP({ ...p, price: e.target.value })} required /></div>
						<div className="row"><input placeholder="Stock" type="number" value={p.stock} onChange={e => setP({ ...p, stock: e.target.value })} required /></div>
						<div className="row"><button type="submit">Add Product</button></div>
					</form>
				</div>

				<div className="card">
					<h2>Customers</h2>
					<ul>
						{customers.map(item => (
							<li key={item.id} style={{ marginBottom: 8 }}>
								{item.name} ({item.email})
								<button style={{ marginLeft: 8 }} onClick={() => editCustomer(item)}>Edit</button>
								<button style={{ marginLeft: 8 }} onClick={() => deleteCustomer(item.id)}>Delete</button>
							</li>
						))}
					</ul>
					<form onSubmit={addCustomer}>
						<div className="row"><input placeholder="Name" value={c.name} onChange={e => setC({ ...c, name: e.target.value })} required /></div>
						<div className="row"><input placeholder="Email" type="email" value={c.email} onChange={e => setC({ ...c, email: e.target.value })} required /></div>
						<div className="row"><button type="submit">Add Customer</button></div>
					</form>
				</div>
			</div>
		</div>
	);
}

=======
export default function AdminDashboard() {
  if (!Auth.isAdmin()) return <Navigate to="/login" replace />;

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [p, setP] = useState({ name: "", price: "", stock: "" });
  const [c, setC] = useState({ name: "", email: "" });

  useEffect(() => { loadProducts(); loadCustomers(); }, []);
  const loadProducts = () => fetch(productAPI).then(r => r.json()).then(setProducts);
  const loadCustomers = () => fetch(customerAPI).then(r => r.json()).then(setCustomers);

  const addProduct = (e) => {
    e.preventDefault();
    fetch(productAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: p.name, price: Number(p.price), stock: Number(p.stock) })
    }).then(() => { setP({ name: "", price: "", stock: "" }); loadProducts(); });
  };

  const addCustomer = (e) => {
    e.preventDefault();
    fetch(customerAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: c.name, email: c.email })
    }).then(() => { setC({ name: "", email: "" }); loadCustomers(); });
  };

  const deleteProduct = (id) =>
    fetch(`${productAPI}/${id}`, { method: "DELETE" }).then(loadProducts);

  const deleteCustomer = (id) =>
    fetch(`${customerAPI}/${id}`, { method: "DELETE" }).then(loadCustomers);

  const editProduct = (item) => {
    const name = prompt("Product name:", item.name);
    if (name == null) return;
    const priceStr = prompt("Price:", item.price);
    if (priceStr == null) return;
    const stockStr = prompt("Stock:", item.stock);
    if (stockStr == null) return;
    const price = Number(priceStr);
    const stock = Number(stockStr);
    fetch(`${productAPI}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, stock })
    }).then(loadProducts);
  };

  const editCustomer = (item) => {
    const name = prompt("Customer name:", item.name);
    if (name == null) return;
    const email = prompt("Email:", item.email);
    if (email == null) return;
    fetch(`${customerAPI}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }).then(loadCustomers);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p style={{ color: "#666", marginTop: -8 }}>Manage products and customers</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card">
          <h2>Products</h2>
          <ul>
            {products.map(item => (
              <li key={item.id} style={{ marginBottom: 8 }}>
                {item.name} — ${item.price} (Stock: {item.stock})
                <button style={{ marginLeft: 8 }} onClick={() => editProduct(item)}>Edit</button>
                <button style={{ marginLeft: 8 }} onClick={() => deleteProduct(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <form onSubmit={addProduct}>
            <div className="row"><input placeholder="Name" value={p.name} onChange={e=>setP({...p, name:e.target.value})} required /></div>
            <div className="row"><input placeholder="Price" type="number" step="0.01" value={p.price} onChange={e=>setP({...p, price:e.target.value})} required /></div>
            <div className="row"><input placeholder="Stock" type="number" value={p.stock} onChange={e=>setP({...p, stock:e.target.value})} required /></div>
            <div className="row"><button type="submit">Add Product</button></div>
          </form>
        </div>

        <div className="card">
          <h2>Customers</h2>
          <ul>
            {customers.map(item => (
              <li key={item.id} style={{ marginBottom: 8 }}>
                {item.name} ({item.email})
                <button style={{ marginLeft: 8 }} onClick={() => editCustomer(item)}>Edit</button>
                <button style={{ marginLeft: 8 }} onClick={() => deleteCustomer(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <form onSubmit={addCustomer}>
            <div className="row"><input placeholder="Name" value={c.name} onChange={e=>setC({...c, name:e.target.value})} required /></div>
            <div className="row"><input placeholder="Email" type="email" value={c.email} onChange={e=>setC({...c, email:e.target.value})} required /></div>
            <div className="row"><button type="submit">Add Customer</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
