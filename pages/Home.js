// pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppCard from "../components/AppCard";

const Home = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await axios.get("/api/apps");
        setApps(res.data.apps);
      } catch (error) {
        console.error("Failed to fetch apps:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Featured & Recommended Apps</h2>
      {loading ? (
        <p>Loading apps...</p>
      ) : (
        <div style={gridStyle}>
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const titleStyle = {
  fontFamily: "'Poppins', sans-serif",
  color: "#4F46E5",
  marginBottom: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

export default Home;
