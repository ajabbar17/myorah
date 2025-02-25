import { db } from "./firebase"; 
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "firebase/firestore";

/**
 * Fetches the latest order from Firestore and generates the next order number
 * Handles cases where orderNo might not exist in previous documents
 * @returns {Promise<number>} The next order number to use
 */
export const getNextOrderNumber = async () => {
  try {
    // Query to get the latest order, sorted by orderNo in descending order
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("orderNo", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    
    // If no orders exist yet or no documents have orderNo field, start with order number 1001
    if (querySnapshot.empty) {
      return 1001;
    }
    
    // Get the latest order data
    const latestOrder = querySnapshot.docs[0].data();
    
    // Check if orderNo exists in the document
    if (latestOrder.orderNo === undefined || latestOrder.orderNo === null) {
      // If orderNo doesn't exist, start from 1001
      return 1001;
    }
    
    // Return the next order number
    return latestOrder.orderNo + 1;
  } catch (error) {
    console.error("Error fetching latest order number:", error);
    // In case of error, provide a fallback based on timestamp to ensure uniqueness
    return Math.floor(1000000 + Date.now() % 1000000);
  }
};

/**
 * Saves the order to Firestore with an auto-generated order number
 * @param {Object} orderData - The order details
 * @returns {Promise<string>} - The ID of the created order document
 */
export const saveOrderToFirestore = async (orderData) => {
  try {
    // Get the next order number
    const orderNo = await getNextOrderNumber();
    
    // Add the order to Firestore with the order number
    const orderRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      orderNo,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    
    return orderRef.id;
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Failed to place order. Please try again.");
  }
};