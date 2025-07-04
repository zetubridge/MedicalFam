// utils/paystackClient.js
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function verifyPayment(reference) {
  try {
    const response = await axios.get(
      https://api.paystack.co/transaction/verify/${reference},
      {
        headers: {
          Authorization: Bearer ${PAYSTACK_SECRET_KEY},
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Paystack verification error:", error.response?.data || error.message);
    throw error;
  }
}
