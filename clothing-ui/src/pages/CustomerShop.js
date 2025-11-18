// src/pages/CustomerShop.js
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../auth";

const productAPI = "http://localhost:8081/products";

// Generate a placeholder image per product (no extra setup)
const imgFor = (name, i) =>
<<<<<<< HEAD
	`https://picsum.photos/seed/${encodeURIComponent((name || "clothes") + "-" + i)}/400/300`;

export default function CustomerShop() {
	// Only allow customers to view this page
	if (!Auth.isCustomer()) return <Navigate to="/login" replace />;

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(productAPI).then(r => r.json()).then(setProducts);
	}, []);

	return (
		<div style={{ padding: 20 }}>
			<h1>Shop</h1>
			<p style={{ color: "#666", marginTop: -8 }}>Browse our latest items</p>

			<div style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
				gap: 20
			}}>
				{products.map((p, i) => (
					<div key={p.id} style={{
						background: "white",
						borderRadius: 16,
						overflow: "hidden",
						boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
					}}>
						<img
							alt={p.name}
							src={imgFor(p.name, i)}
							style={{ width: "100%", height: 160, objectFit: "cover" }}
						/>
						<div style={{ padding: 12 }}>
							<div style={{ fontWeight: 600 }}>{p.name}</div>
							<div style={{ color: "#111", marginTop: 4 }}>${p.price}</div>
							<div style={{ color: p.stock > 0 ? "#059669" : "#dc2626", fontSize: 12, marginTop: 4 }}>
								{p.stock > 0 ? `In stock: ${p.stock}` : "Out of stock"}
							</div>
							<button
								disabled={p.stock <= 0}
								style={{
									marginTop: 10,
									width: "100%",
									padding: "8px 0",
									borderRadius: 10,
									border: "1px solid #ddd",
									cursor: p.stock > 0 ? "pointer" : "not-allowed",
									background: p.stock > 0 ? "#111827" : "#f3f4f6",
									color: p.stock > 0 ? "white" : "#999"
								}}
							>
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
=======
  `https://picsum.photos/seed/${encodeURIComponent((name || "clothes") + "-" + i)}/400/300`;

export default function CustomerShop() {
  // Only allow customers to view this page
  if (!Auth.isCustomer()) return <Navigate to="/login" replace />;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(productAPI).then(r => r.json()).then(setProducts);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Shop</h1>
      <p style={{ color: "#666", marginTop: -8 }}>Browse our latest items</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 20
      }}>
        {products.map((p, i) => (
          <div key={p.id} style={{
            background: "white",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
          }}>
            <img
              alt={p.name}
              src={imgFor(p.name, i)}
              style={{ width: "100%", height: 160, objectFit: "cover" }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ color: "#111", marginTop: 4 }}>${p.price}</div>
              <div style={{ color: p.stock > 0 ? "#059669" : "#dc2626", fontSize: 12, marginTop: 4 }}>
                {p.stock > 0 ? `In stock: ${p.stock}` : "Out of stock"}
              </div>
              <button
                disabled={p.stock <= 0}
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: "8px 0",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  cursor: p.stock > 0 ? "pointer" : "not-allowed",
                  background: p.stock > 0 ? "#111827" : "#f3f4f6",
                  color: p.stock > 0 ? "white" : "#999"
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
}
