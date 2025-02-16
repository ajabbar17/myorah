import { db } from "./firebase"; // Ensure this is correctly initialized
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Saves the order to Firestore
 * @param {Object} orderData - The order details
 * @returns {Promise<string>} - The ID of the created order document
 */
export const saveOrderToFirestore = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(), // Timestamp for order tracking
    });

    return orderRef.id; // Returning order ID
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Failed to place order. Please try again.");
  }
};
