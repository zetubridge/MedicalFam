// pages/Payment.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get("appId");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!appId) {
      setMessage("No app ID provided.");
    }
  }, [appId]);

  const handlePayment = () => {
    setLoading(true);
    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: "YOUR_PAYSTACK_PUBLIC_KEY", // replace with your public key
      email: "customer@example.com", // ideally get from user auth
      amount: 150000, // KES 1,500 in kobo
      currency: "KES",
      ref: ${appId}-${Date.now()},
      onClose: () => {
        setLoading(false);
        setMessage("Payment cancelled.");
      },
      callback: async (response) => {
        // Verify payment on backend
        try {
          const res = await axios.post("/api/payments/verify", {
            reference: response.reference,
            appId,
            developerId: "", // fill if you have developer info
          });
          if (res.data.success) {
            setMessage("Payment successful! Your app will be reviewed soon.");
            setTimeout(() => navigate("/"), 5000);
          } else {
            setMessage("Payment verification failed.");
          }
        } catch (err) {
          setMessage("Error verifying payment.");
        } finally {
          setLoading(false);
        }
      },
    });
    handler.openIframe();
  };

  return (
    <div style={container}>
      <h2 style={title}>Complete Your Payment</h2>
      {message && <p>{message}</p>}
      {!message && (
        <button onClick={handlePayment} disabled={loading} style={buttonStyle}>
          {loading ? "Processing..." : "Pay KES 1,500"}
        </button>
      )}
    </div>
  );
};

const container = {
  maxWidth: "400px",
  margin: "40px auto",
  textAlign: "center",
  fontFamily: "'Poppins', sans-serif",
};

const title = {
  color: "#4F46E5",
  marginBottom: "20px",
};

const buttonStyle = {
  backgroundColor: "#4F46E5",
  color: "#fff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Payment;
