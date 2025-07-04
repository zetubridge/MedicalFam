// routes/apps.js
import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

// Get all published apps, MED-A featured first
router.get("/", async (req, res) => {
  try {
    const appsSnapshot = await db.collection("apps")
      .where("status", "==", "published")
      .orderBy("recommended", "desc")  // recommended apps first
      .orderBy("createdAt", "desc")
      .get();

    const apps = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, apps });
  } catch (error) {
    console.error("Error fetching apps:", error);
    res.status(500).json({ success: false, message: "Failed to fetch apps" });
  }
});

// Submit new app (initially status=pending, paymentStatus=pending)
router.post("/submit", async (req, res) => {
  try {
    const appData = req.body;

    // Add timestamps and default statuses
    appData.status = "pending";
    appData.paymentStatus = "pending";
    appData.createdAt = new Date().toISOString();
    appData.updatedAt = new Date().toISOString();

    const docRef = await db.collection("apps").add(appData);

    res.json({ success: true, appId: docRef.id });
  } catch (error) {
    console.error("Error submitting app:", error);
    res.status(500).json({ success: false, message: "Failed to submit app" });
  }
});

export default router;
