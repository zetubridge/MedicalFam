// components/AppCard.js
import React from "react";

const AppCard = ({ app }) => {
  return (
    <div style={cardStyle}>
      <img src={app.logoUrl} alt={${app.name} logo} style={logoStyle} />
      <h3 style={nameStyle}>
        {app.name}{" "}
        {app.recommended && (
          <span style={badgeStyle}>Recommended</span>
        )}
      </h3>
      <p style={descStyle}>{app.description}</p>
      <div style={screenshotsContainer}>
        {app.screenshots.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={Screenshot ${idx + 1}}
            style={screenshotStyle}
          />
        ))}
      </div>
      <a
        href={app.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={downloadButton}
      >
        Download
      </a>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease",
  cursor: "pointer",
};

const logoStyle = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
  marginBottom: "10px",
};

const nameStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "600",
  fontSize: "1.2rem",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const badgeStyle = {
  backgroundColor: "#4F46E5",
  color: "#fff",
  fontSize: "0.75rem",
  padding: "2px 8px",
  borderRadius: "12px",
};

const descStyle = {
  fontSize: "0.9rem",
  color: "#444",
  flexGrow: 1,
  marginBottom: "10px",
};

const screenshotsContainer = {
  display: "flex",
  gap: "8px",
  overflowX: "auto",
  marginBottom: "15px",
};

const screenshotStyle = {
  width: "80px",
  height: "140px",
  borderRadius: "6px",
  objectFit: "cover",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};

const downloadButton = {
  backgroundColor: "#4F46E5",
  color: "#fff",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "6px",
  textAlign: "center",
  fontWeight: "600",
  transition: "background-color 0.3s ease",
};

export default AppCard;
