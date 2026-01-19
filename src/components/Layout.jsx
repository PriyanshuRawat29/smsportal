import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />

      <Sidebar />

      <div
        className="main-content"
        style={{
          marginTop: 60,
          /* marginLeft is handled in CSS */
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
