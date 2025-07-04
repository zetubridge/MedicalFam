// components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={{ color: "#4F46E5" }}>ZetuBridge</h1>
      <nav>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/publish" style={linkStyle}>Publish App</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

const linkStyle = {
  marginLeft: "15px",
  textDecoration: "none",
  color: "#4F46E5",
  fontWeight: "500"
};

export default Header;
