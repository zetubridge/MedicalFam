// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2025 ZetuBridge. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  textAlign: "center",
  padding: "15px",
  backgroundColor: "#f5f5f5",
  marginTop: "40px",
  fontSize: "14px",
  color: "#666"
};

export default Footer;
