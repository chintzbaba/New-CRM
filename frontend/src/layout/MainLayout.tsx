//this document defines page structure or navigation structure
// Outlet --> connects routes to layout

import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/">Dashboard</Link>
          <Link to="/customers">Customers</Link>
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        <Outlet />  
      </main>
    </div>
  );
}
