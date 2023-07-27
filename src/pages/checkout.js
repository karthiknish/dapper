import { getCart, clearCart } from "../util/cart";
import { useState, useEffect } from "react";
import { db } from "../util/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Router from "next/router";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({});
  const [formAddress, setFormAddress] = useState({});

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };
  const autofillAddress = () => {
    setFormAddress(address);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      Router.push("/auth");
      return;
    }
    const userCart = getCart();
    if (userCart.length === 0) {
      Router.push("/");
      return;
    }
    setCartItems(userCart);
    const userEmail = JSON.parse(userData).email;
    getAddressByEmail(userEmail).then((fetchedAddress) => {
      setAddress(fetchedAddress);
    });
  }, []);
  const handleOrderSubmission = async (e) => {
    e.preventDefault();

    const { target } = e;
    const userData = localStorage.getItem("user");
    const userEmail = userData ? JSON.parse(userData).email : null;

    const order = {
      name: target[0].value,
      addressLine1: target[1].value,
      addressLine2: target[2].value || null,
      city: target[3].value,
      state: target[4].value,
      zip: target[5].value,
      phone: target[6].value,
      cartItems: cartItems,
      email: userEmail,
    };

    try {
      await addDoc(collection(db, "users", userEmail, "orders"), order).then(
        () => handleClearCart()
      );
      alert("Order successfully submitted!");
    } catch (error) {
      console.error("There was an error submitting the order:", error);
      alert("There was an error submitting your order. Please try again.");
    }

    try {
      await addDoc(collection(db, "users", userEmail, "addresses"), {
        address: {
          name: order.name,
          addressLine1: order.addressLine1,
          addressLine2: order.addressLine2,
          city: order.city,
          state: order.state,
          zip: order.zip,
          phone: order.phone,
        },
      });
    } catch (error) {
      console.error("There was an error saving the address:", error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Checkout</h1>
      {cartItems.length > 0 &&
        cartItems.map((item, index) => (
          <div
            className="bg-white p-4 my-2 flex items-center justify-between rounded shadow-md text-gray-700"
            key={index}
          >
            <h3 className="font-semibold text-xl mb-2">{item.fields.title}</h3>
            <div className="flex items-center">
              <p className="border p-2 w-16">{item.quantity}</p>
            </div>
          </div>
        ))}
      {console.log(address)}
      {address && address.addressLine1 && (
        <div
          className="bg-blue-100 p-4 my-4 rounded shadow-md cursor-pointer hover:bg-blue-200"
          onClick={autofillAddress}
        >
          <p>
            <strong>Saved Address:</strong>
          </p>
          <p>{address.name}</p>
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.zip}</p>
          <p>{address.phone}</p>
          <p className="text-sm italic">Click to autofill</p>
        </div>
      )}
      <form onSubmit={handleOrderSubmission}>
        <input
          type="text"
          placeholder="Full Name"
          value={formAddress.name || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, name: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={formAddress.addressLine1 || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, addressLine1: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={formAddress.addressLine2 || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, addressLine2: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
        />
        <input
          type="text"
          placeholder="City"
          value={formAddress.city || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, city: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={formAddress.state || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, state: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={formAddress.zip || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, zip: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formAddress.phone || ""}
          onChange={(e) =>
            setFormAddress({ ...formAddress, phone: e.target.value })
          }
          className="border rounded p-2 my-2 w-full"
          required
        />
        <button
          type="submit"
          className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
async function getAddressByEmail(email) {
  try {
    // Create a query against the subcollection
    const addressQuery = query(collection(db, "users", email, "addresses"));

    const querySnapshot = await getDocs(addressQuery);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return docData.address;
    } else {
      console.warn(`No address found for email: ${email}`);
      return {};
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return {};
  }
}
export default Checkout;
