function Footer() {
  return (
    <div
      style={{
        height: 40,
        backgroundColor: "rgb(0, 176, 202)", // BLUE
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#ffffff",
        borderTop: "1px solid rgba(0, 0, 0, 0.15)" // subtle top border
      }}
    >
      © {new Date().getFullYear()} SMS Gateway Portal. All rights reserved.
    </div>
  );
}

export default Footer;
