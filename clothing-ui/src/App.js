// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
<<<<<<< HEAD
import AdminDashboard from "./pages/AdminDashboard";

import { getUser, isAdmin } from "./auth";

//import Admin from "./pages/Admin";

// Protected Component: Checks only for AUTHENTICATION (Logged In)
function Protected({ children }) {
	const u = getUser();
	if (!u) return <Navigate to="/login" replace />;
	return children;
}

// 2. NEW AdminProtected Component: Checks for AUTHENTICATION and AUTHORIZATION (Is Admin)
function AdminProtected({ children }) {
	const u = getUser();
	// If not logged in, redirect to login
	if (!u) return <Navigate to="/login" replace />;
	// If logged in but NOT admin, show a denial message (or redirect to shop)
	if (!isAdmin()) return <div style={{ padding: 20 }}>Access Denied: Admins only.</div>;
	return children;
}


export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<div style={{ background: "#f3f4f6", minHeight: "calc(100vh - 56px)" }}>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/shop" element={<Protected><Shop /></Protected>} />
					<Route path="/cart" element={<Protected><Cart /></Protected>} />

					<Route path="/admin" element={<AdminProtected><AdminDashboard /></AdminProtected>} />

					<Route path="*" element={<div style={{ padding: 20 }}>Not found</div>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
/* 
import AdminDashboard from "./pages/AdminDashboard"; 
import { getUser, isAdmin } from "./auth"; // <-- Ensure isAdmin is imported


// 2. NEW AdminProtected Component: Checks for AUTHENTICATION and AUTHORIZATION (Is Admin)
function AdminProtected({ children }) {
  const u = getUser();
  // If not logged in, redirect to login
  if (!u) return <Navigate to="/login" replace />; 
  // If logged in but NOT admin, show a denial message (or redirect to shop)
  if (!isAdmin()) return <div style={{ padding: 20 }}>Access Denied: Admins only.</div>; 
  return children;
}

		  <Route path="/cart" element={<Protected><Cart /></Protected>} />
		  
		  {}
		  <Route path="/admin" element={<AdminProtected><AdminDashboard /></AdminProtected>} /> 

*/
=======
import Admin from "./pages/Admin";
import { getUser } from "./auth";

function Protected({ children }) {
  const u = getUser();
  if (!u) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ background: "#f3f4f6", minHeight: "calc(100vh - 56px)" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Protected><Shop /></Protected>} />
          <Route path="/cart" element={<Protected><Cart /></Protected>} />
          <Route path="/admin" element={<Protected><Admin /></Protected>} />
          <Route path="*" element={<div style={{ padding: 20 }}>Not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
>>>>>>> 7a1550d4a0a2f0d66d567bb005ba888344454c02
