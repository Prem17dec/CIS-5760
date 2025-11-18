// src/components/Header.js
import { Link, useNavigate } from "react-router-dom";
import { getUser, isAdmin, logout } from "../auth";

export default function Header() {
<<<<<<< HEAD
	const u = getUser();
	const nav = useNavigate();

	const onLogout = () => {
		logout();
		nav("/login");
	};

	const brandStyle = {
		fontWeight: 800,
		fontSize: 20,
		letterSpacing: 0.5,
	};

	return (
		<div style={{
			display: "flex", alignItems: "center", justifyContent: "space-between",
			padding: "12px 16px", background: "#111827", color: "white",
			position: "sticky", top: 0, zIndex: 10
		}}>
			<div style={brandStyle}>
				<Link to="/" style={{ color: "white", textDecoration: "none" }}>
					Warrensburg Clothing Store
				</Link>
			</div>
			<nav style={{ display: "flex", gap: 16 }}>
				{u && <Link to="/shop" style={{ color: "white" }}>Shop</Link>}
				{u && <Link to="/cart" style={{ color: "white" }}>Cart</Link>}
				{u && isAdmin() && <Link to="/admin" style={{ color: "white" }}>Admin</Link>}
				{!u && <Link to="/login" style={{ color: "white" }}>Login</Link>}
				{u && <button onClick={onLogout} style={{
					background: "#ef4444", color: "white", border: "none",
					padding: "6px 10px", borderRadius: 8, cursor: "pointer"
				}}>Logout</button>}
			</nav>
		</div>
	);
=======
  const u = getUser();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  const brandStyle = {
    fontWeight: 800,
    fontSize: 20,
    letterSpacing: 0.5,
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", background: "#111827", color: "white",
      position: "sticky", top: 0, zIndex: 10
    }}>
      <div style={brandStyle}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Warrensburg Clothing Store
        </Link>
      </div>
      <nav style={{ display: "flex", gap: 16 }}>
        {u && <Link to="/shop" style={{ color: "white" }}>Shop</Link>}
        {u && <Link to="/cart" style={{ color: "white" }}>Cart</Link>}
        {u && isAdmin() && <Link to="/admin" style={{ color: "white" }}>Admin</Link>}
        {!u && <Link to="/login" style={{ color: "white" }}>Login</Link>}
        {u && <button onClick={onLogout} style={{
          background: "#ef4444", color: "white", border: "none",
          padding: "6px 10px", borderRadius: 8, cursor: "pointer"
        }}>Logout</button>}
      </nav>
    </div>
  );
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
}
