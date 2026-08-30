import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AIAssistant from "../components/AIAssistant";

function MainLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
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

      <AIAssistant />

    </div>
  );
}

export default MainLayout;