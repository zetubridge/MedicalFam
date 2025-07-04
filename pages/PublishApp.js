// pages/PublishApp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublishApp = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    logoUrl: "",
    downloadUrl: "",
    screenshots: ["", "", "", ""],
    developerId: "", // You can prefill or get from auth later
    developerName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const newScreenshots = [...form.screenshots];
      newScreenshots[index] = e.target.value;
      setForm({ ...form, screenshots: newScreenshots });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (
      !form.name ||
      !form.description ||
      !form.category ||
      !form.logoUrl ||
      !form.downloadUrl ||
      form.screenshots.some((url) => !url)
    ) {
      setError("Please fill all fields and provide 4 screenshot URLs.");
      setLoading(false);
      return;
    }

    try {
      // Submit app details to backend
      const res = await axios.post("/api/apps/submit", form);
      if (res.data.success) {
        // Redirect to payment page with appId param
        navigate(/payment?appId=${res.data.appId});
      } else {
        setError("Failed to submit app.");
      }
    } catch (err) {
      setError("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Publish Your App</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="App Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="App Description"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px" }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Medical Education)"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="url"
          name="logoUrl"
          placeholder="Logo URL"
          value={form.logoUrl}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="url"
          name="downloadUrl"
          placeholder="Download URL"
          value={form.downloadUrl}
          onChange={handleChange}
          style={inputStyle}
        />
        <p>Enter 4 Screenshot URLs:</p>
        {form.screenshots.map((url, idx) => (
          <input
            key={idx}
            type="url"
            placeholder={Screenshot URL ${idx + 1}}
            value={url}
            onChange={(e) => handleChange(e, idx)}
            style={inputStyle}
          />
        ))}
        <input
          type="text"
          name="developerId"
          placeholder="Developer ID"
          value={form.developerId}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="developerName"
          placeholder="Developer Name"
          value={form.developerName}
          onChange={handleChange}
          style={inputStyle}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Submitting..." : "Submit & Pay KES 1,500"}
        </button>
      </form>
    </div>
  );
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "'Poppins', sans-serif",
};

const title = {
  color: "#4F46E5",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  backgroundColor: "#4F46E5",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default PublishApp;
