// routes/payments.js
import express from "express";
import { verifyPayment } from "../utils/paystackClient.js";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

// Endpoint to verify payment after user completes payment on frontend
router.post("/verify", async (req, res) => {
  const { reference, appId, developerId } = req.body;

  if (!reference || !appId || !developerId) {
    return res.status(400).json({ success: false, message: "Missing parameters" });
  }

  try {
    const paystackRes = await verifyPayment(reference);

    if (paystackRes.status && paystackRes.data.status === "success") {
      // Record payment in payments collection
      const paymentDoc = {
        appId,
        developerId,
        amount: paystackRes.data.amount, // in kobo
        currency: paystackRes.data.currency,
        reference,
        status: "completed",
        paystackReference: paystackRes.data.reference,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await db.collection("payments").add(paymentDoc);

      // Update app paymentStatus to completed and keep status as pending (awaiting admin approval)
      await db.collection("apps").doc(appId).update({
        paymentStatus: "completed",
        updatedAt: new Date().toISOString()
      });

      return res.json({ success: true, message: "Payment verified and recorded" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

export default router;
