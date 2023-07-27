import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

async function fetchOrders() {
  try {
    const userQuerySnapshot = await getDocs(collection(db, "users"));

    const allOrders = [];
    for (const userDoc of userQuerySnapshot.docs) {
      const userEmail = userDoc;
      const ordersSnapshot = await getDocs(
        collection(db, "users", userEmail, "orders")
      );

      const userOrders = ordersSnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      allOrders.push(...userOrders);
    }
    console.log(allOrders);
    return allOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export default fetchOrders;
