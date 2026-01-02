import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />

      <Sidebar />

      <div
        style={{
          marginTop: 60,
          marginLeft: 64,   // ✅ ALWAYS collapsed width
          padding: 20,
          minHeight: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
