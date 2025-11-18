// src/pages/Cart.js
import { useEffect, useState } from "react";
import { requireUser } from "../auth";

const CART_API = (cid) => `http://localhost:8081/carts/${cid}`;
const UPDATE_API = (cid, itemId, q) => `http://localhost:8081/carts/${cid}/items/${itemId}?quantity=${q}`;
const DELETE_API = (cid, itemId) => `http://localhost:8081/carts/${cid}/items/${itemId}`;

export default function Cart() {
<<<<<<< HEAD
	const user = requireUser();
	const [cart, setCart] = useState(null);
	const load = () => fetch(CART_API(user.customerId)).then(r => r.json()).then(setCart);

	useEffect(() => { load(); }, []);

	const updateQty = async (itemId, q) => {
		await fetch(UPDATE_API(user.customerId, itemId, q), { method: "PUT" });
		load();
	};
	const removeItem = async (itemId) => {
		await fetch(DELETE_API(user.customerId, itemId), { method: "DELETE" });
		load();
	};
	const clear = async () => {
		await fetch(CART_API(user.customerId), { method: "DELETE" });
		load();
	};

	if (!cart) return <div style={{ padding: 20 }}>Loading cart…</div>;

	const total = cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

	return (
		<div style={{ padding: 20 }}>
			<h2>Your Cart</h2>
			{cart.items.length === 0 && <div>No items yet.</div>}
			<ul>
				{cart.items.map(it => (
					<li key={it.id} style={{ marginBottom: 8 }}>
						{it.productName} — ${it.price.toFixed(2)} ×{" "}
						<input type="number" value={it.quantity} min={1}
							onChange={e => updateQty(it.id, Number(e.target.value))}
							style={{ width: 60 }} />
						<button onClick={() => removeItem(it.id)} style={{ marginLeft: 8 }}>Remove</button>
					</li>
				))}
			</ul>
			<div style={{ marginTop: 12, fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
			<button onClick={clear} style={{
				marginTop: 10, background: "#ef4444", color: "white",
				border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer"
			}}>Clear cart</button>
		</div>
	);
=======
  const user = requireUser();
  const [cart, setCart] = useState(null);
  const load = () => fetch(CART_API(user.customerId)).then(r=>r.json()).then(setCart);

  useEffect(()=>{ load(); }, []);

  const updateQty = async (itemId, q) => {
    await fetch(UPDATE_API(user.customerId, itemId, q), { method: "PUT" });
    load();
  };
  const removeItem = async (itemId) => {
    await fetch(DELETE_API(user.customerId, itemId), { method: "DELETE" });
    load();
  };
  const clear = async () => {
    await fetch(CART_API(user.customerId), { method: "DELETE" });
    load();
  };

  if (!cart) return <div style={{ padding: 20 }}>Loading cart…</div>;

  const total = cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.items.length === 0 && <div>No items yet.</div>}
      <ul>
        {cart.items.map(it => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            {it.productName} — ${it.price.toFixed(2)} ×{" "}
            <input type="number" value={it.quantity} min={1}
              onChange={e=>updateQty(it.id, Number(e.target.value))}
              style={{ width: 60 }}/>
            <button onClick={()=>removeItem(it.id)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12, fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
      <button onClick={clear} style={{
        marginTop: 10, background: "#ef4444", color: "white",
        border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer"
      }}>Clear cart</button>
    </div>
  );
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
}
