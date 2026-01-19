function Footer() {
  return (
    <div
      style={{
        height: 50,
        backgroundColor: "#111111", // Dark background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        color: "#ffffff",
        marginTop: "auto", // Ensure it sits at bottom if used in flex-column
        width: "100%"
      }}
    >
      © {new Date().getFullYear()} Bmobile Solomon Islands.
    </div>
  );
}

export default Footer;
