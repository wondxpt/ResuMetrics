import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >

      <Navbar />

      <main
        style={{
          paddingBottom: "80px",
        }}
      >
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;