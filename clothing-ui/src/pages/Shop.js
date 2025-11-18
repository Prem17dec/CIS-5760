// src/pages/Shop.js
import { useEffect, useState } from "react";
import { requireUser } from "../auth";

const PRODUCT_API = "http://localhost:8081/products";
const CART_API = (cid) => `http://localhost:8081/carts/${cid}/items`;

export default function Shop() {
<<<<<<< HEAD
	const user = requireUser(); // throws if not logged in
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		fetch(PRODUCT_API)
			.then(r => r.json())
			.then(setItems)
			.finally(() => setLoading(false));
	}, []);

	const addToCart = async (productId) => {
		setMsg("");
		await fetch(CART_API(user.customerId), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ productId, quantity: 1 })
		});
		setMsg("Added to cart!");
		setTimeout(() => setMsg(""), 1500);
	};

	if (loading) return <div style={{ padding: 20 }}>Loading products…</div>;

	return (
		<div style={{ padding: 20 }}>
			<h2>Shop</h2>
			{msg && <div style={{ color: "green" }}>{msg}</div>}
			<div style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
				gap: 16
			}}>
				{items.map(p => (
					<div key={p.id} style={{
						background: "white", borderRadius: 12, padding: 16,
						boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
					}}>
						<div style={{ fontWeight: 600, fontSize: 18 }}>{p.name}</div>
						<div style={{ margin: "8px 0" }}>${p.price.toFixed(2)}</div>
						<div style={{ fontSize: 12, color: "#666" }}>In stock: {p.stock}</div>
						<button onClick={() => addToCart(p.id)} style={{
							marginTop: 10, background: "#111827", color: "white",
							border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer"
						}}>Add to cart</button>
					</div>
				))}
			</div>
		</div>
	);
=======
  const user = requireUser(); // throws if not logged in
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(PRODUCT_API)
      .then(r=>r.json())
      .then(setItems)
      .finally(()=>setLoading(false));
  }, []);

  const addToCart = async (productId) => {
    setMsg("");
    await fetch(CART_API(user.customerId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    setMsg("Added to cart!");
    setTimeout(()=>setMsg(""), 1500);
  };

  if (loading) return <div style={{ padding: 20 }}>Loading products…</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop</h2>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16
      }}>
        {items.map(p => (
          <div key={p.id} style={{
            background: "white", borderRadius: 12, padding: 16,
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{p.name}</div>
            <div style={{ margin: "8px 0" }}>${p.price.toFixed(2)}</div>
            <div style={{ fontSize: 12, color: "#666" }}>In stock: {p.stock}</div>
            <button onClick={()=>addToCart(p.id)} style={{
              marginTop: 10, background: "#111827", color: "white",
              border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer"
            }}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
}
