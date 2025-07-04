// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import appsRoutes from "./routes/apps.js";
import paymentsRoutes from "./routes/payments.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/apps", appsRoutes);
app.use("/api/payments", paymentsRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("ZetuBridge backend is running");
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
