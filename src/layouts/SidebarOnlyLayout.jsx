import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function SidebarOnlyLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
